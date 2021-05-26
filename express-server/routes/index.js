var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models').User;
var Notice = require('../models').Notice;
var Banner = require('../models').Banner;
var Qna = require('../models').Qna;
var Faq = require('../models').Faq;
var Destination = require('../models').Destination;
var Item = require('../models').Item;
var Genre = require('../models').Genre;
var ItemGenre = require('../models').ItemGenre;
var Cart = require('../models').Cart;

const passport = require('passport');
var fs = require('fs');

var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
var upload = multer({ dest: 'uploads/' });
const rootPath = path.normalize(__dirname + '/..');

const mysqldb = require('../mysql/mysqldb');
var bannerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'banner/');
	},
	filename: (req, file, cb) => {
		cb(null, `banner_${Date.now()}`);
	},
});
var banner = multer({ storage: bannerStorage });

/* GET home page. */
router.get('/', function (req, res, next) {
	if (req.isAuthenticated()) {
		res.send(req.session.userID);
	} else {
		res.status(403).send('로그인 필요');
	}
});
router.get('/uploads/:img_id', function (req, res) {
	console.log('req.params.img_id : ', req.params.img_id);
	res.sendFile(`${rootPath}/uploads/${req.params.img_id}`);
	//res.sendfile(path.resolve(__dirname,))
});

router.post('/upload', upload.single('cover'), function (req, res) {
	console.log('in post /upload');
	res.send(req.file.path);
	console.log(req.file.path);
});

router.post('/search', function (req, res, next) {
	var searchGenre = 0;
	mysqldb.connectiond.query(
		`SELECT * FROM musicstore.genres where name like concat('%', ?, '%')`,
		[req.body.keyword],
		function (err, rows, fields) {
			if (err) {
				console.log(err);
			} else {
				console.log("장르 검색결과:");
				if(rows.length > 0) {
					searchGenre = rows[0].id;
					console.log(searchGenre);
				} else {
					searchGenre = -1;
					console.log("없음");
				}
				console.log(searchGenre + "번 장르도 같이 찾는준");
				mysqldb.connectiond.query(
					`SELECT * FROM musicstore.items
					join musicstore.itemgenres
					on musicstore.items.id = musicstore.itemgenres.itemID
					where musicstore.itemgenres.genreID = ? or
				musicstore.items.album like concat('%', ?, '%') or
				musicstore.items.singer like concat('%', ?, '%') or
				musicstore.items.supply like concat('%', ?, '%')
				group by musicstore.items.id;`,
					[searchGenre, req.body.keyword, req.body.keyword, req.body.keyword],
					function (err, rows, fields) {
						if (err) {
							console.log(err);
						} else {
							console.log("검색결과:");
							console.log(rows);
							res.send(rows);
						}
					}
				);
			}
		}
	);
});

router.post('/getcart', function (req, res, next) {
	/*
	SELECT * FROM musicstore.carts
	left outer join musicstore.items
	on musicstore.carts.itemID = musicstore.items.id where userID=?;
	를 할수 있으면 얼마나 좋을까?
	*/
	console.log('받아온거 : ', req.body.userID);
	mysqldb.connectiond.query(
		`SELECT * FROM musicstore.carts
	left outer join musicstore.items
	on musicstore.carts.itemID = musicstore.items.id where userID=?`,
		[req.body.userID],
		function (err, rows, fields) {
			if (err) {
				console.log(err);
			} else {
				res.send(rows);
			}
		}
	);
});

router.post('/editcart', function (req, res, next) {
	mysqldb.connectiond.query(
		`UPDATE musicstore.carts SET quantity=? WHERE id=?`,
		[req.body.quantity, req.body.cartID],
		function (err, rows, fields) {
			if (err) {
				console.log(err);
			} else {
				res.send(rows);
			}
		}
	);
});

router.post('/deletecart', function (req, res, next) {
	mysqldb.connectiond.query(`DELETE FROM musicstore.carts WHERE id=?`, [req.body.cartID], function (err, rows, fields) {
		if (err) {
			console.log(err);
		} else {
			res.send(rows);
		}
	});
});

router.post('/addcart', function (req, res, next) {
	Cart.create({
		itemID: req.body.itemID,
		userID: req.body.userID,
		quantity: req.body.quantity,
	})
		.then(result => {
			res.send(result);
		})
		.catch(err => {
			console.error(err);
		});
});

router.post('/item_detail', function (req, res, next) {
	console.log('finding Item Information with id = ', req.body.que);
	Item.findOne({
		where: {
			id: req.body.queryID,
		},
	}).then(result => {
		res.send(result);
	});
});

router.get('/getgenres', function (req, res, next) {
	Genre.findAll()
		.then(result => {
			res.send(result);
		})
		.catch(err => {
			console.error(err);
		});
});

router.post('/getgenres', function (req, res, next) {
	Genre.findAll()
		.then(result => {
			if (req.body.itemID) {
				let listofGenres = [];
				ItemGenre.findAll({
					where: {
						itemID: req.body.itemID,
					},
				}).then(genRes => {
					console.log(req.body.itemID + "번 아이템에 대한 장르 연결 정보:");
					console.log(genRes);
					genRes.forEach(g => {
						listofGenres.push(result.find(value => value.id === g.dataValues.genreID).dataValues);
					});
					console.log(req.body.itemID + "번 아이템에 대한 장르:");
					console.log(listofGenres);
					res.send(listofGenres);
				});
			} else {
				res.send(result);
			}
		})
		.catch(err => {
			console.error(err);
		});
});

router.post('/additem', function (req, res, next) {
	Item.create({
		album: req.body.album,
		singer: req.body.singer,
		price: req.body.price,
		supply: req.body.supply,
		detail: req.body.detail,
		cover: req.body.cover,
	})
		.then(result => {
			//장르 추가할 것
			req.body.genre.forEach(el => {
				mysqldb.connectiond.query(
					`insert into musicstore.itemgenres (itemID, genreID)
					select * from (select ?, ?) as tmp
					where not exists (
					select itemID, genreID from musicstore.itemgenres where itemID=? and genreID=?
					) LIMIT 1;`,
					[result.dataValues.id, el, result.dataValues.id, el],
					function (err, rows, fields) {
						if(err) {
							console.log("error occured while /additem /additemgenres");
							console.log(err);
						}	
					});
				/*ItemGenre.create({
					itemID: result.dataValues.id,
					genreID: el,
				});*/
			});
			res.status(201).json(result);
		})
		.catch(err => {
			console.log('error while adding item');
			console.error(err);
			next(err);
		});
});

router.post('/edititem', function (req, res, next) {
	Item.update(
		{
			album: req.body.album,
			singer: req.body.singer,
			price: req.body.price,
			supply: req.body.supply,
			detail: req.body.detail,
			cover: req.body.cover,
		},
		{
			where: { id: req.body.id },
		}
	).catch(err => {
		console.log('error while adding item');
		console.error(err);
		next(err);
	});

	ItemGenre.findAll({
		where: {
			itemID: req.body.id,
		},
	}).then(tempGenres => {
		tempGenres.forEach(g => {
			if (req.body.genre.indexOf(g.dataValues.genreID) === -1) {
				ItemGenre.destroy({
					where: { id: g.dataValues.id },
				});
			}
		});
	});
	req.body.genre.forEach(g => {
		ItemGenre.findAll({
			where: {
				itemID: req.body.id,
				genreID: g,
			},
		}).then(result => {
			if (result.length === 0) {
				ItemGenre.create({
					itemID: req.body.id,
					genreID: g,
				});
			}
		});
	});

	res.status(201).send('success');
	/*Item.findOne({
		where : {id: req.body.id}
	}).then(result => {
		req.body.genre.forEach(el => {
			
		})
		res.status(201).json(result);
	})*/
});

router.post('/deleteitem', function (req, res, next) {
	mysqldb.connectiond.query(`DELETE FROM musicstore.items WHERE id=?`, [req.body.itemID], function (err, rows, fields) {
		if (err) {
			console.log(err);
		} else {
			mysqldb.connectiond.query(`DELETE musicstore.itemgenres WHERE itemID=?`, [req.body.itemID], function (err, rows, fields) {
				res.send(rows);
			});
		}
	});
});

router.post('/changeinfo', function (req, res, next) {
	User.findAll({
		where: {
			id: req.body.userID,
		},
	})
		.then(result => {
			if (result[0].dataValues.password === req.body.current) {
				if (req.body.new !== '') {
					//비밀번호 변경하는 경우
					User.update(
						{
							password: req.body.new,
							name: req.body.name,
							email: req.body.email,
							gender: req.body.gender,
							birth: req.body.birth,
						},
						{
							where: { id: req.body.userID },
						}
					)
						.then(result => {
							res.status(200).json(result);
						})
						.catch(err => {
							console.error(err);
							next(err);
						});
				} else {
					//비밀번호는 바꾸지 않는 경우
					User.update(
						{
							name: req.body.name,
							email: req.body.email,
							gender: req.body.gender,
							birth: req.body.birth,
						},
						{
							where: { id: req.body.userID },
						}
					)
						.then(result => {
							res.status(200).json(result);
						})
						.catch(err => {
							console.error(err);
							next(err);
						});
				}
			} else res.status(202).send('current password incorrect');
		})
		.catch(err => {
			console.error(err);
			next(err);
		});
});

router.post('/signup', function (req, res, next) {
	console.log('in post req, /signup');
	console.log(User);
	User.findAll({
		where: {
			userID: req.body.id,
		},
	}).then(result => {
		console.log('signup id 조회');
		console.log(result);
	});
	User.create({
		name: req.body.username,
		userID: req.body.id,
		password: req.body.password,
		email: req.body.email,
		gender: req.body.sex,
		birth: req.body.birth,
		isAdult: req.body.adult,
	})
		.then(result => {
			console.log(result);
			res.status(201).json(result);
		})
		.catch(err => {
			console.log('in signup error handler');
			console.error(err);
			next(err);
		});
});

router.post('/add_destination', function (req, res, next) {
	console.log('in post req, /add_destination');
	console.log(Destination);
	Destination.create({
		customerName: req.body.customerName,
		customerContact: req.body.customerContact,
		postcode: req.body.postcode,
		roadAddress: req.body.roadAddress,
		jibunAddress1: req.body.jibunAddress1,
		jibunAddress2: req.body.jibunAddress2,
		extraAddress: req.body.extraAddress,
		addressOwner: req.body.addressOwner,
	})
		.then(result => {
			console.log(result);
			res.status(201).json(result);
		})
		.catch(err => {
			console.log('error while destination add');
			console.error(err);
			next(err);
		});
});

router.post('/edit_destination', function (req, res, next) {
	console.log('in post req, /edit_destination');
	console.log(Destination);
	Destination.update(
		{
			customerName: req.body.customerName,
			customerContact: req.body.customerContact,
			postcode: req.body.postcode,
			roadAddress: req.body.roadAddress,
			jibunAddress1: req.body.jibunAddress1,
			jibunAddress2: req.body.jibunAddress2,
			extraAddress: req.body.extraAddress,
			addressOwner: req.body.addressOwner,
		},
		{
			where: { id: req.body.id },
		}
	)
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			next(err);
		});
});

router.post('/delete_destination', function (req, res, next) {
	console.log('in post req, /delete_destination');
	console.log(Destination);
	Destination.destroy({
		where: { id: req.body.id },
	})
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			next(err);
		});
});

router.post('/destination', function (req, res, next) {
	console.log('in /destination POST req');
	console.log(req.body.id);
	Destination.findAll({
		where: {
			addressOwner: req.body.id,
		},
	}).then(result => {
		console.log(result);
		res.status(201).json(result);
	});
});

router.post('/login', passport.authenticate('local'), function (req, res) {
	res.status(201).send(req.user);
});

router.get('/login', function (req, res, next) {
	console.log(req.isAuthenticated());
	if (req.isAuthenticated()) {
		res.json(req.user);
	} else {
		res.send('not logged in');
	}
});

router.get('/logout', (req, res) => {
	req.logout();
	delete req.user;
	res.status(201).send('logout 성공');
});

// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', (authError, user, info) => {
//         console.log(info);
//         console.log('in route, index.js /login');
//         res.status(201).json(req.user);
//         return req.login(user, loginError => {
//             if(loginError){
//                 console.error(loginError);
//             }
//         });
//     })(req, res, next);

// })

router.post('/userInfo', function (req, res, next) {
	User.findOne({ where: { userID: req.body.userID } })
		.then(response => {
			console.log('in userInfo');
			res.send(response);
		})
		.catch(err => {
			console.error(err);
		});
});

router.post('/notice', function (req, res, next) {
	const { title, contents } = req.body;
	console.log(title, contents);
	Notice.create({
		title,
		contents,
	})
		.then(response => {
			console.log('공지사항 등록 성공');
			res.send('공지사항 등록 성공');
		})
		.catch(err => {
			console.error(err);
		});
});
router.post('/faq', function (req, res, next) {
	const { title, contents } = req.body;
	Faq.create({
		title,
		contents,
	})
		.then(response => {
			console.log('FAQ 등록 성공');
			res.send('FAQ 등록 성공');
		})
		.catch(err => {
			console.error(err);
		});
});
router.post('/qna', function (req, res, next) {
	const { title, contents } = req.body;
	Qna.create({
		title,
		contents,
	})
		.then(response => {
			console.log('QnA 등록 성공');
			res.send('QnA 등록 성공');
		})
		.catch(err => {
			console.error(err);
		});
});
router.post('/banner', banner.single('banner'), function (req, res, next) {
	Banner.create({
		title: req.body.title,
		bannerPath: req.file.path,
		start: req.body.start,
		end: req.body.end,
	});
	res.send(req.file.path);
});

router.get('/notice', function (req, res, next) {
	Notice.findAll()
		.then(result => {
			res.send(result);
		})
		.catch(err => {
			console.error(err);
		});
});

router.get('/faq', function (req, res, next) {
	Faq.findAll()
		.then(result => {
			res.send(result);
		})
		.catch(err => {
			console.error(err);
		});
});

router.get('/qna', function (req, res, next) {
	Qna.findAll()
		.then(result => {
			res.send(result);
		})
		.catch(err => {
			console.error(err);
		});
});

router.get('/banner', function (req, res) {
	Banner.findAll().then(result => {
		res.send(result);
	});
});

router.get('/banner/:banner', (req, res) => {
	console.log('in banner/:banner ', req.params.banner);
	console.log(path.join(rootPath, 'banner', req.params.banner));
	res.sendFile(path.join(rootPath, 'banner', req.params.banner));
});

router.get('/main_contents', function (req, res, next) {
	const data = {};
	Banner.findAll()
		.then(result => {
			const b_path = result
				.filter(el => {
					const temp = new Date();
					const today = temp.setHours(temp.getHours() + 9);
					const target = new Date(el.end);
					if (today < target) {
						return el;
					}
				})
				.reverse()
				.slice(0, 5)
				.map(el => el.bannerPath);

			data.bannerInfo = b_path;
		})
		.then(() => {
			Item.findAll()
				.then(result => {
					const i_path = result.reverse().slice(0, 3);

					data.itemInfo = i_path;
				})
				.then(() => {
					res.json(JSON.stringify(data));
				});
		})
		.catch(err => {
			console.error(err);
		});
});

router.get('/product', function (req, res, next) {
	Item.findAll()
		.then(result => {
			res.send(result);
		})
		.catch(err => {
			console.error(err);
		});
});

router.get('/main', function (req, res) {
	const data = {};
	Notice.findAll().then(result => {
		console.log(result);
	});
});
module.exports = router;

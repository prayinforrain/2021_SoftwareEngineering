var express = require("express");
var router = express.Router();
var User = require("../models").User;
var Destination = require("../models").Destination;
const passport = require('passport');

/* GET home page. */
router.get("/", function (req, res, next) {
    if(req.isAuthenticated()){
        res.send(req.session.userID);
    }else{
        res.status(403).send('로그인 필요');
    }
});

router.post("/changeinfo", function (req, res, next) {
    User.findAll({
        where :{
            id : req.body.userID
        }
    }).then(result => {
        if(result[0].dataValues.password === req.body.current) {
            if(req.body.new !== "") {
                //비밀번호 변경하는 경우
                User.update({
                    password: req.body.new,
                    name: req.body.name,
                    email: req.body.email,
                    gender: req.body.gender,
                    birth: req.body.birth
                }, {
                    where: { id : req.body.userID}
                }).then((result) => {
                    res.status(200).json(result);
                }).catch((err) =>{
                    console.error(err);
                    next(err);
                });
            } else {
                //비밀번호는 바꾸지 않는 경우
                User.update({
                    name: req.body.name,
                    email: req.body.email,
                    gender: req.body.gender,
                    birth: req.body.birth
                }, {
                    where: { id : req.body.userID}
                }).then((result) => {
                    res.status(200).json(result);
                }).catch((err) =>{
                    console.error(err);
                    next(err);
                });
            }
        } else res.status(202).send("current password incorrect");
    }).catch((err) => {
        console.error(err);
        next(err);
    });
});

router.post("/signup", function (req, res, next) {
    console.log("in post req, /signup");
    console.log(User);
    User.findAll({
        where :{
            userID : req.body.id
        }
    }).then(result =>{
        console.log('signup id 조회')
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
        .then((result) => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch((err) => {
            console.log("in signup error handler");
            console.error(err);
            next(err);
        });
});

router.post("/add_destination", function (req, res, next) {
    console.log("in post req, /add_destination");
    console.log(Destination);
    Destination.create({
        postcode: req.body.postcode,
        roadAddress: req.body.roadAddress,
        jibunAddress1: req.body.jibunAddress1,
        jibunAddress2: req.body.jibunAddress2,
        extraAddress: req.body.extraAddress,
        addressOwner: req.body.addressOwner,
    }).then((result) => {
        console.log(result);
        res.status(201).json(result);
    }).catch((err) => {
        console.log("error while destination add");
        console.error(err);
        next(err);
    });
})

router.post('/destination', function(req, res, next) {
    console.log('in /destination POST req');
    console.log(req.body.id);
    Destination.findAll({
        where:{
            addressOwner:req.body.id
        }
    }).then(result=>{
        console.log(result);
        res.status(201).json(result);
    });
})

router.post('/login', 
    passport.authenticate('local'), function(req, res) {
        res.status(201).send(req.user);
    });


router.get('/login', function(req, res, next) {
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()){
        res.json(req.user);
    }else{
       res.send('not logged in');
    }
})

router.get('/logout', (req,res)=>{
    req.logout();
    delete req.user;
    res.status(201).send('logout 성공');
})

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


router.get("/test", function(req, res, next) {
    Destination.findAll({
        where :{
            addressOwner : 1
        }
    }).then(result => {
        console.log(result);
    });
    res.render("index", { title: "Test" });
})

module.exports = router;

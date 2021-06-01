import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/add_item.css';
import * as config from '../Config';

const Additem = ({ closePopup, closeEdit, editStatus }) => {
	const [attach, setAttach] = useState();
	const [checkItems, setCheckItems] = useState([]);
	const [genres, setGenres] = useState([]);
	const [fileChanged, setFileChanged] = useState(false);
	const [originURL, setOriginURL] = useState('');
	//장르 1발라드 2댄스 3랩힙합 4R&B/Soul 5인디 6록메탈 7트로트 8포크블루스

	const checkHandler = (checked, id) => {
		if (checked) {
			setCheckItems([...checkItems, id]);
		} else {
			setCheckItems(checkItems.filter(e => e !== id));
		}
		console.log(checkItems);
	};

	const fetchGenres = async () => {
		const res = await axios.get(`${config.BACKEND_URL}/getgenres/`, {});
		setGenres(res.data);
	};

	useEffect(() => {
		fetchGenres();
		if (editStatus !== -1) {
			//장르 가져오기
			axios({
				method: 'POST',
				url: `${config.BACKEND_URL}/getgenres`,
				data: {
					itemID: editStatus,
				},
			})
				.then(res => {
					console.log(res.data);
					setCheckItems(res.data.map(d => d.id));
				})
				.catch(err => {
					console.log(err);
				});

			//폼 채우기
			const form = document.getElementById('add_item_form');
			const { album, singer, supply, price, detail, cover, available, released } = form;
			axios({
				method: 'POST',
				url: `${config.BACKEND_URL}/item_detail/`,
				data: {
					queryID: editStatus,
				},
			})
				.then(res => {
					album.value = res.data.album;
					singer.value = res.data.singer;
					supply.value = res.data.supply;
					price.value = res.data.price;
					detail.value = res.data.detail;
					available.checked = res.data.available;
					released.value = res.data.released;
					setAttach(`${config.BACKEND_URL}/` + res.data.cover);
					setOriginURL(res.data.cover);
				})
				.catch(err => {
					console.log(err);
				});
		}
	}, []);

	const cancelHandler = () => {
		closeEdit(-1);
		closePopup(false);
	};

	const onAval = e => {
		console.log(e.target.checked);
	};

	const submitHandler = e => {
		e.preventDefault();
		const form = document.getElementById('add_item_form');
		const { album, singer, supply, price, detail, cover, available, released } = form;
		const fileForm = new FormData();
		fileForm.append('cover', cover.files[0]);
		if (editStatus === -1) {
			//신규
			axios
				.post(`${config.BACKEND_URL}/upload`, fileForm, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
				.then(coverPath => {
					axios({
						method: 'POST',
						url: `${config.BACKEND_URL}/additem`,
						data: {
							album: album.value,
							singer: singer.value,
							supply: supply.value,
							price: parseInt(price.value),
							detail: detail.value,
							cover: coverPath.data,
							genre: checkItems,
							available: available.checked,
							released: released.value,
						},
					})
						.then(res => {
							console.log(res);
							alert('성공');
							closeEdit(-1);
							closePopup(false);
						})
						.catch(err => {
							console.log('err occured while additem : ');
							console.log(err);
							alert('Error occured');
							return;
						});
				})
				.catch(err => {
					console.log('err occured while upload : ' + err);
					alert('Error occured');
					return;
				});
		} else {
			//수정
			if (fileChanged === true) {
				axios
					.post(`${config.BACKEND_URL}/upload`, fileForm, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					})
					.then(coverPath => {
						console.log('coverpath', coverPath);

						console.log('coverPath', coverPath);

						const splitPath = coverPath.data.split('\\');
						const realPath = splitPath[1] + '\\' + splitPath[2];
						axios({
							method: 'POST',
							url: `${config.BACKEND_URL}/edititem`,
							data: {
								id: editStatus,
								album: album.value,
								singer: singer.value,
								supply: supply.value,
								price: parseInt(price.value),
								detail: detail.value,
								cover: realPath,
								released: released.value,
								available: available.checked,
								genre: checkItems,
							},
						})
							.then(res => {
								console.log(res);
								alert('성공');
								closeEdit(-1);
								closePopup(false);
							})
							.catch(err => {
								console.log('err occured while edititem : ');
								console.log(err);
								alert('Error occured');
								return;
							});
					})
					.catch(err => {
						console.log('err occured while upload : ' + err);
						alert('Error occured');
						return;
					});
			} else {
				axios({
					method: 'POST',
					url: `${config.BACKEND_URL}/edititem`,
					data: {
						id: editStatus,
						album: album.value,
						singer: singer.value,
						supply: supply.value,
						price: parseInt(price.value),
						detail: detail.value,
						cover: originURL,
						genre: checkItems,
						released: released.value,
						available: available.checked,
					},
				})
					.then(res => {
						console.log(res);
						alert('성공');
						closeEdit(-1);
						closePopup(false);
					})
					.catch(err => {
						console.log('err occured while edititem : ');
						console.log(err);
						alert('Error occured');
						return;
					});
			}
		}
	};

	const onFileChange = e => {
		const {
			target: { files },
		} = e;
		const theFile = files[0];
		const reader = new FileReader();
		reader.onloadend = finished => {
			const {
				currentTarget: { result },
			} = finished;
			setAttach(result);
			setFileChanged(true);
		};
		if (theFile) {
			reader.readAsDataURL(theFile);
		}
	};

	const deleteItem = async e => {
		e.preventDefault();
		axios({
			method: 'POST',
			url: `${config.BACKEND_URL}/deleteitem`,
			data: {
				itemID: editStatus,
			},
		})
			.then(res => {
				console.log(res);
				alert('성공');
				closeEdit(-1);
				closePopup(false);
			})
			.catch(err => {
				console.log('err occured while edititem : ');
				console.log(err);
				alert('Error occured');
				return;
			});
	};

	return (
		<div id="item_manage_container">
			<form action="${config.BACKEND_URL}/" method="post" id="add_item_form" encType="multipart/form-data">
				<div className="item_row">
					<h1>상품 관리</h1>
				</div>
				<div className="item_row">
					{editStatus !== -1 && (
						<>
							<button id="item_delete_btn" onClick={deleteItem}>
								삭제
							</button>
						</>
					)}
				</div>
				<div className="item_row">
					<div className="item_row_name">앨범명</div>
					<div className="item_row_field">
						<input type="text" id="album" name="album" placeholder="앨범명" />
					</div>
				</div>
				<div className="item_row">
					<div className="item_row_name">아티스트</div>
					<div className="item_row_field">
						<input type="text" id="singer" name="singer" placeholder="아티스트" />
					</div>
				</div>
				<div className="item_row">
					<div className="item_row_name">배급사</div>
					<div className="item_row_field">
						<input type="text" id="supply" name="supply" placeholder="배급사" />
					</div>
				</div>
				<div className="item_row">
					<div className="item_row_name">발매일</div>
					<div className="item_row_field">
						<input type="date" id="released" name="released" defaultValue="1970-01-01" />
					</div>
				</div>
				<div className="item_row">
					<div className="item_row_name">가격</div>
					<div className="item_row_field">
						<input type="number" id="price" name="price" placeholder="가격" />
					</div>
				</div>
				<div className="item_row">
					<div className="item_row_name">상세설명</div>
					<div className="item_row_field">
						<textarea type="text" id="detail" name="detail" placeholder="상세설명" />
					</div>
				</div>
				<div className="item_row">
					<div className="item_row_name">앨범커버</div>
					<div className="item_row_field">
						<input type="file" accept="image/*" id="cover" name="cover" placeholder="상세설명" onChange={onFileChange} />
						{attach && (
							<>
								<img src={attach} width="50px" height="50px" />
							</>
						)}
					</div>
				</div>
				<div className="item_row">
					<div className="item_row_name">장르</div>
					<div className="item_row_field" id="item_genre_list">
						{genres.map(i => (
							<label key={i.id}>
								<input
									type="checkbox"
									name="genre"
									onChange={e => checkHandler(e.target.checked, i.id)}
									checked={checkItems.indexOf(i.id) >= 0 ? true : false}
								/>{' '}
								{i.name}
							</label>
						))}
					</div>
				</div>
				<div className="item_row">
					<div className="item_aval">
						<span>상품을 고객이 볼 수 있게 노출합니다. </span>
						<input type="checkbox" id="available" name="available" onClick={onAval} />
					</div>
				</div>
				<button type="submit" onClick={submitHandler} className="item_submit_btn">
					등록
				</button>
				<button onClick={cancelHandler} className="item_submit_btn">
					취소
				</button>
			</form>
		</div>
	);
};

export default Additem;

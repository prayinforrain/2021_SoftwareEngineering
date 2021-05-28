import React, { useEffect, useState } from 'react';
import preview from '../img/preview.png';
import '../style/manager_page.css';
import axios from 'axios';
import Board from './Manage/Board';
import Additem from './Manage/Additem';
import ProductPost from './Manage/ProductPost';
import * as config from './Config';

const ManagerSection = () => {
	const getStartDate = () => {
		const temp = new Date();
		const today = new Date(temp.setHours(temp.getHours() + 9));
		return new Date(today.setDate(today.getDate())).toISOString().slice(0, 10);
	};
	const getEndDate = () => {
		const temp = new Date();
		const today = new Date(temp.setHours(temp.getHours() + 9));
		return new Date(today.setDate(today.getDate() + 7)).toISOString().slice(0, 10);
	};
	// notice, banner, product, qna, faq  순, default 는 notice
	const [board, setBoard] = useState('notice');
	const [boardData, setBoardData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [start, setStart] = useState(getStartDate());
	const [end, setEnd] = useState(getEndDate());
	const [bannerKey, setBannerKey] = useState();
	// 렌더링할 때 default 게시판인 notice의 db 값을 불러와 board에 저장
	const [productPopup, setProductPopup] = useState(false);
	const [productStatus, setProductStatus] = useState(-1);

	const [preivew, setPreivew] = useState('');

	useEffect(() => {
		axios.get(`${config.BACKEND_URL}/${board}`).then(res => {
			setBoardData(res.data.reverse());
		});
	}, [board, productPopup]);
	// 게시판 메뉴 선택 함수
	const chooseMenu = e => {
		const targetBoard = e.target.className.split('_')[1];
		// 게시판 구조가 product를 제외하면 다 같은 상황이라 나머지는 불러오기 기능 통일
		if (e.target.classList.length === 1) {
			document.querySelector(`.menu_${board}`).classList.remove('active');
			document.querySelector(`.menu_${targetBoard}`).classList.add('active');
			setBoard(targetBoard);
			axios.get(`${config.BACKEND_URL}/${targetBoard}`).then(res => {
				setBoardData(res.data.reverse());
			});
		}
	};

	const onChange = e => {
		const inputImage = document.getElementById('banner_file');
		const reader = new FileReader();

		reader.onload = e => {
			const preview = document.getElementById('preview');
			preview.src = e.target.result;
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	const openPopup = data => {
		if (board !== 'product') {
			const background = document.querySelector('.popup_background');
			const popup = document.querySelector(`.board_modify_popup`);
			const addButton = document.getElementById('add_button');
			const modifyButton = document.getElementById('modify_button');
			const deleteButton = document.getElementById('delete_button');
			if (data['id']) {
				deleteButton.style.display = 'block';
				modifyButton.style.display = 'block';
				modifyButton.key = data['id'];
				deleteButton.key = data.id;
				if (board !== 'banner') {
					document.getElementById('board_popup_title').value = data.title;
					document.getElementById('board_popup_detail').value = data.contents;
				} else {
					document.getElementById('board_popup_title').value = data.title;
					document.getElementById('preview').src = `${config.BACKEND_URL}/${data.bannerPath}`;
					document.getElementById('start').value = data.start;
					document.getElementById('end').value = data.end;
				}
			} else {
				addButton.style.display = 'block';
				deleteButton.style.display = 'none';
			}

			background.style.display = 'block';
			popup.style.display = 'block';
		} else {
			setProductPopup(true);
			setProductStatus(-1);
		}
	};

	const deletePost = e => {
		axios.delete(`${config.BACKEND_URL}/${board}/${e.target.key}`).then(result => {
			setBoardData(result.data);
			if (board === 'banner') {
				closeBannerPopup();
			} else {
				closePopup();
			}
		});
	};

	const modifyPost = e => {
		axios.get(`${config.BACKEND_URL}/${board}/${e.target.key}`).then(res => {
			const title = document.getElementById('board_popup_title');
			const contents = document.getElementById('board_popup_detail');
			if (title.value.trim() === res.data.title && contents.value.trim() === res.data.contents) {
				alert('수정된 내용이 없습니다');
				return;
			}
			axios.patch(`${config.BACKEND_URL}/${board}/${e.target.key}`, { title: title.value, contents: contents.value }).then(() => {
				axios({
					method: 'GET',
					url: `${config.BACKEND_URL}/${board}`,
				})
					.then(res => {
						setBoardData(res.data.reverse());
						closePopup();
					})
					.catch(err => {
						console.error(err);
					});
			});
		});
	};
	const closePopup = () => {
		const background = document.querySelector(`.popup_background`);
		const popup = document.querySelector(`.board_modify_popup`);
		document.getElementById('add_button').style.display = 'none';
		document.getElementById('modify_button').style.display = 'none';
		document.getElementById(`board_popup_title`).value = '';
		document.getElementById(`board_popup_detail`).value = '';
		background.style.display = 'none';
		popup.style.display = 'none';
	};
	const closeBannerPopup = () => {
		const background = document.querySelector(`.popup_background`);
		const popup = document.querySelector(`.board_modify_popup`);
		document.getElementById(`board_popup_title`).value = '';
		document.getElementById(`banner_file`).value = '';
		document.getElementById('preview').src = preview;
		document.getElementById('add_button').style.display = 'none';
		document.getElementById('modify_button').style.display = 'none';
		background.style.display = 'none';
		popup.style.display = 'none';
	};

	const startDateChange = e => {
		setStart(e.target.value);
	};
	const endDateChange = e => {
		setEnd(e.target.value);
	};

	const onProductClick = (e, id) => {
		setProductPopup(true);
		setProductStatus(id);
	};

	const onSubmit = e => {
		e.preventDefault();
		if (board === 'product') {
		} else if (board === 'banner') {
			// banner 게시판 onSubmit
			const title = e.target.title.value;
			const banner = e.target.banner.files[0];
			const form = new FormData();
			form.append('title', title);
			form.append('banner', banner);
			form.append('start', start);
			form.append('end', end);
			if (bannerKey) {
				axios
					.patch(`${config.BACKEND_URL}/banner/${bannerKey}`, form, { headers: { 'Content-Type': 'multipart/form-data' } })
					.then(res => {
						setBoardData(axios.get(`${config.BACKEND_URL}/${board}`).data);
						closeBannerPopup();
					})
					.then(() => {
						axios({
							method: 'GET',
							url: `${config.BACKEND_URL}/${board}`,
						})
							.then(res => {
								setBoardData(res.data.reverse());
							})
							.catch(err => {
								console.error(err);
							});
						setBannerKey();
					})
					.catch(err => {
						console.error(err);
					});
			} else {
				if (title && banner) {
					if (start > end) {
						alert('게시 시작일은 게시 종료일보다 빨라야 합니다!');
						return;
					}

					axios
						.post(`${config.BACKEND_URL}/banner`, form, { headers: { 'Content-Type': 'multipart/form-data' } })
						.then(res => {
							setBoardData(axios.get(`${config.BACKEND_URL}/${board}`).data);
						})
						.then(() => {
							axios({
								method: 'GET',
								url: `${config.BACKEND_URL}/${board}`,
							})
								.then(res => {
									setBoardData(res.data.reverse());
								})
								.catch(err => {
									console.error(err);
								});
						})
						.catch(err => {
							console.error(err);
						});
				} else {
					alert('내용을 입력해주세요!');
				}
			}
			closeBannerPopup();
		} else {
			const title = document.getElementById(`board_popup_title`).value;
			const contents = document.getElementById(`board_popup_detail`).value;

			axios({
				method: 'POST',
				url: `${config.BACKEND_URL}/${board}`,
				data: {
					title,
					contents,
				},
			})
				.then(res => {
					setBoardData(axios.get(`${config.BACKEND_URL}/${board}`).data);
					closePopup();
				})
				.then(() => {
					axios({
						method: 'GET',
						url: `${config.BACKEND_URL}/${board}`,
					})
						.then(res => {
							setBoardData(res.data.reverse());
						})
						.catch(err => {
							console.error(err);
						});
				})
				.catch(err => {
					console.error(err);
				});
		}
	};
	return (
		<div id="main">
			<div className="body_container">
				<div className="inner_body">
					<ul className="body_menu">
						<li className="menu_notice active" onClick={chooseMenu}>
							공지 관리
						</li>
						<li className="menu_banner" onClick={chooseMenu}>
							배너 관리
						</li>
						<li className="menu_product" onClick={chooseMenu}>
							상품 관리
						</li>
						<li className="menu_qna" onClick={chooseMenu}>
							Q&A 관리
						</li>
						<li className="menu_faq" onClick={chooseMenu}>
							FAQ 관리
						</li>
					</ul>
					{board === 'product' ? (
						<div className="product_board board">
							<div className="product">
								<div className="product_idx">번호</div>
								<div className="product_singer">가수</div>
								<div className="product_title">앨범명</div>
								<div className="product_genre">장르</div>
								<div className="product_release_date">발매일</div>
								<div className="product_publish">유통사</div>
							</div>
							<div className="product_posts">
								{boardData.map(i => (
									<div className="inner_board" key={i.id} onClick={e => onProductClick(e, i.id)}>
										<ProductPost data={i} />
									</div>
								))}
							</div>
						</div>
					) : (
						<Board setBannerKey={setBannerKey} board={board} boardData={boardData} openPopup={openPopup} />
					)}
				</div>
			</div>
			<div id="insert_button" onClick={openPopup}>
				<div className="left"></div>
				<div className="right"></div>
			</div>
			<div className="popup_background"></div>
			{board === 'banner' ? ( // 배너 게시물 추가 팝업
				<div className="board_modify_popup">
					<form id="board_modify_form" onSubmit={onSubmit}>
						<div className="board_popup_title_area">
							<div className="board_popup_text">{board} 제목</div>
							<input type="text" id="board_popup_title" name="title" />
						</div>
						<div className="banner_popup_detail_area">
							<img id="preview" src={preview} width="100%" height="100%" />
							<div className="input_section">
								<div className="input_file">
									<div className="board_popup_text">배너 파일 업로드</div>
									<input type="file" id="banner_file" name="banner" onChange={onChange} accept="image/*" />
								</div>
								<div className="input_date">
									<span>게시 시작일</span>
									<input type="date" id="start" name="start" onChange={startDateChange} value={start} />
									<span>게시 종료일</span>
									<input type="date" id="end" name="end" onChange={endDateChange} value={end} />
								</div>
							</div>
						</div>
						<div className="board_popup_ox">
							<button type="submit" id="add_button">
								입력하기
							</button>
							<button type="submit" id="modify_button">
								수정하기
							</button>
							<button type="button" onClick={closeBannerPopup}>
								취소하기
							</button>
						</div>
					</form>
					<div id="delete_button" onClick={deletePost}>
						삭제
					</div>
				</div>
			) : (
				// 공지, QnA, FAQ 추가 팝업
				<div className="board_modify_popup">
					<form id="board_modify_form" onSubmit={onSubmit}>
						<div className="board_popup_title_area">
							<div className="board_popup_text">{board} 제목</div>
							<input type="text" id="board_popup_title" />
						</div>
						<div className="board_popup_detail_area">
							<div className="board_popup_text">내용</div>
							<textarea name="board_popup_detail" id="board_popup_detail"></textarea>
						</div>
						<div className="board_popup_ox">
							<button type="submit" id="add_button">
								입력하기
							</button>
							<button type="button" id="modify_button" onClick={modifyPost}>
								수정하기
							</button>
							<button type="button" onClick={closePopup}>
								취소하기
							</button>
						</div>
					</form>
					<div id="delete_button" onClick={deletePost}>
						삭제
					</div>
				</div>
			)}

			{productPopup && <Additem closePopup={setProductPopup} closeEdit={setProductStatus} editStatus={productStatus} />}
		</div>
	);
};
export default ManagerSection;

import React, { useEffect, useState } from 'react';
import '../style/manager_page.css';
import axios from 'axios';
import Board from './Manage/Board';
import Additem from './Manage/Additem';
import ProductPost from './Manage/ProductPost';

const ManagerSection = () => {
	// notice, banner, product, qna, faq  순, default 는 notice
	const [board, setBoard] = useState('notice');
	const [boardData, setBoardData] = useState([]);
	const [loading, setLoading] = useState(false);
	// 렌더링할 때 default 게시판인 notice의 db 값을 불러와 board에 저장
	const [productPopup, setProductPopup] = useState(false);
	const [productStatus, setProductStatus] = useState(-1);

	useEffect(() => {
		axios.get(`http://localhost:3001/${board}`).then(res => {
			console.log(res.data);
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
			axios.get(`http://localhost:3001/${targetBoard}`).then(res => {
				setBoardData(res.data.reverse());
			});
		}
	};
	const openPopup = () => {
		if(board !== "product") {
			const background = document.querySelector('.popup_background');
			const popup = document.querySelector(`.board_modify_popup`);
			background.style.display = 'block';
			popup.style.display = 'block';
		} else {
			setProductPopup(true);
			setProductStatus(-1);
		}
	};
	const closePopup = () => {
		const background = document.querySelector(`.popup_background`);
		const popup = document.querySelector(`.board_modify_popup`);
		document.getElementById(`board_popup_title`).value = '';
		document.getElementById(`board_popup_detail`).value = '';
		background.style.display = 'none';
		popup.style.display = 'none';
	};

	const onProductClick = (e, id) => {
		setProductPopup(true);
		setProductStatus(id);
	}

	const onSubmit = e => {
		e.preventDefault();
		if (board !== 'product') {
			const title = document.getElementById(`board_popup_title`).value;
			const contents = document.getElementById(`board_popup_detail`).value;

			axios({
				method: 'POST',
				url: `http://localhost:3001/${board}`,
				data: {
					title,
					contents,
				},
			})
				.then(res => {
					setBoardData(axios.get(`http://localhost:3001/${board}`).data);
					closePopup();
				})
				.then(() => {
					axios({
						method: 'GET',
						url: `http://localhost:3001/${board}`,
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
								{boardData.map((i) => (
									<div className="inner_board" onClick={(e) => onProductClick(e, i.id)}>
										<ProductPost data={i}/>
									</div>
								))}
							</div>
						</div>
					) : (
						<Board board={board} boardData={boardData} />
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
							<input type="text" id="board_popup_title" />
						</div>
						<div className="board_popup_detail_area">
							<div className="board_popup_text">내용</div>
							<textarea name="board_popup_detail" id="board_popup_detail"></textarea>
						</div>
						<div className="board_popup_ox">
							<button type="submit">입력하기</button>
							<button type="button" onClick={closePopup}>
								취소하기
							</button>
						</div>
					</form>
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
							<button type="submit">입력하기</button>
							<button type="button" onClick={closePopup}>
								취소하기
							</button>
						</div>
					</form>
				</div>
			)}
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
						<button type="submit">입력하기</button>
						<button type="button" onClick={closePopup}>
							취소하기
						</button>
					</div>
				</form>
			</div>
			{productPopup && (
				<Additem closePopup={setProductPopup} closeEdit = {setProductStatus} editStatus = {productStatus}/>
			)}
		</div>
	);
};
export default ManagerSection;

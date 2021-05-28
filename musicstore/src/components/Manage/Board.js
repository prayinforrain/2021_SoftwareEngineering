import Post from './Post';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Board = ({ board, boardData, openPopup, setBannerKey }) => {
	const totalPage = boardData ? Math.ceil(boardData.length / 10) : 0;
	const [page, setPage] = useState(1);

	const createArray = () => {
		const newArray = [];
		const num = Math.ceil(boardData.length / 10);
		for (let i = 0; i < num; i++) {
			newArray.push(boardData.slice(10 * i, 10 * (i + 1)));
		}
		return newArray;
	};
	const changePage = e => {
		if (parseInt(e.target.innerText) !== page) {
			setPage(parseInt(e.target.innerText));
		}
	};
	if (board === 'banner') {
		return (
			<div className="board">
				<div className="inner_board">
					<div className="board_idx">번호</div>
					<div className="board_title notice_title_top">{board} 제목</div>
					<div className="board_contents"></div>
					<div className="board_start_date">시작 날짜</div>
					<div className="board_end_date">종료 날짜</div>
				</div>
				{!boardData ? (
					<div>로딩중...</div>
				) : boardData.length === 0 ? null : totalPage <= 1 ? (
					<div className="board_posts">
						{boardData.map((el, idx) => (
							<Post setBannerKey={setBannerKey} key={idx} board={board} data={el} openPopup={openPopup} />
						))}
					</div>
				) : (
					<div className="board_posts">
						{createArray(boardData)[page - 1].map((data, idx) => (
							<Post key={idx} setBannerKey={setBannerKey} board={board} data={data} openPopup={openPopup} />
						))}
						<div className="pagination">
							{createArray(boardData).map((el, idx) => (
								<div key={idx} className={idx + 1 === page ? 'page page_active' : 'page'} onClick={changePage}>
									{idx + 1}
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		);
	}
	return (
		<div className="board">
			<div className="inner_board">
				<div className="board_idx">번호</div>
				<div className="board_title notice_title_top">{board} 제목</div>
				<div className="board_contents"></div>
				<div className="board_date">날짜</div>
			</div>
			{!boardData ? (
				<div>로딩중...</div>
			) : boardData.length === 0 ? null : totalPage <= 1 ? (
				<div className="board_posts">
					{boardData.map((el, idx) => (
						<Post key={idx} board={board} data={el} openPopup={openPopup} />
					))}
				</div>
			) : (
				<div className="board_posts">
					{createArray(boardData)[page - 1].map(data => (
						<Post key={boardData.id} board={board} data={data} openPopup={openPopup} />
					))}
					<div className="pagination">
						{createArray(boardData).map((el, idx) => (
							<div key={idx} className={idx + 1 === page ? 'page page_active' : 'page'} onClick={changePage}>
								{idx + 1}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Board;

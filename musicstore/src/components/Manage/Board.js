import Post from './Post';
import { useState, useEffect } from 'react';
const Board = ({ loading, board, boardData }) => {
	const totalPage = boardData ? Math.ceil(boardData.length / 10) : 0;
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		setData(createArray(boardData));
	}, []);

	const createArray = arr => {
		const newArray = [];
		const num = Math.ceil(arr.length / 10);
		for (let i = 0; i < num; i++) {
			newArray.push(arr.slice(10 * i, 10 * (i + 1)));
		}
		return newArray;
	};
	const changePage = e => {
		if (parseInt(e.target.innerText) !== page) {
			setPage(parseInt(e.target.innerText));
		}
	};

	return (
		<div className="board">
			<div className="inner_board">
				<div className="board_idx">번호</div>
				<div className="board_title notice_title_top">{board} 제목</div>
				<div className="board_contents"></div>
				<div className="board_date">날짜</div>
			</div>
			{loading ? (
				<div>로딩중...</div>
			) : !boardData ? null : totalPage <= 1 ? (
				<div className="board_posts">
					{boardData.map(el => (
						<Post key={el.id} board={board} data={el} />
					))}
				</div>
			) : (
				<div className="board_posts">
					{data[page - 1].map(data => (
						<Post key={data.id} board={board} data={data} />
					))}
					<div className="pagination">
						{data.map((el, idx) => (
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

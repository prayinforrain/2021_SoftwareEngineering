import Post from './Post';

const Board = ({ loading, board, boardData }) => {
	return (
		<div className="board">
			<div className="inner_board">
				<div className="board_idx">번호</div>
				<div className="board_title notice_title_top">{board} 제목</div>
				<div className="board_contents"></div>
				<div className="board_date">날짜</div>
			</div>
			<div className="board_posts">
				{loading ? <div>로딩중...</div> : !boardData ? null : boardData.map(el => <Post key={el.id} board={board} data={el} />)}
			</div>
		</div>
	);
};

export default Board;

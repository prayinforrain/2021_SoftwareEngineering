const Post = ({ board, data }) => {
	return (
		<div className="inner_board">
			<div className={`board_idx`}>{data.id}</div>
			<div className={`board_title`}>{data.title}</div>
			<div className={`board_contents`}>{data.contents}</div>
			<div className={`board_date`}>{data.createdAt.slice(0, 10)}</div>
		</div>
	);
};

export default Post;

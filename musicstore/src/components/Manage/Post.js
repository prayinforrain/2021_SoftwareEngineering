const Post = ({ board, data }) => {
	if (board === 'banner') {
		const isExpired = () => {
			if (new Date() > new Date(data.end)) {
				return true;
			}
			return false;
		};
		return (
			<div className={isExpired() ? 'inner_board expired' : 'inner_board'}>
				<div className={`board_idx`}>{data.id}</div>
				<div className={`board_title`}>{data.title}</div>
				<div className={`board_contents`}>{data.contents}</div>
				<div className={`board_start_date`}>{data.start}</div>
				<div className={`board_end_date`}>{data.end}</div>
			</div>
		);
	}
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

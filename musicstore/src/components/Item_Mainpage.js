import * as config from './Config';

const Item_Mainpage = ({ data, openItemModal, closeItemModal }) => {
	const ad = data.cover.split('\\').join('/');
	return (
		<div
			className="mainpage_item"
			style={{ backgroundImage: `url(${config.BACKEND_URL}/${ad})` }}
			onClick={() => {
				openItemModal(data);
				console.log(data);
			}}
		>
			{/* 서버에선 ad 대신 data.cover */}
			<div>앨범 : {data.album}</div>
			<div>가수 : {data.singer}</div>
			<div>배급사 : {data.supply}</div>
		</div>
	);
};

export default Item_Mainpage;

import * as config from './Config';

const Item_Mainpage = ({ data }) => {
	console.log(data);
	const ad = data.cover.split('\\');
	const onMouseEnter = e => {
		e.target.classList.add('hover');
	};
	const onMouseLeave = e => {
		e.target.classList.remove('hover');
	};
	return (
		<div
			className="mainpage_item"
			style={{ backgroundImage: `url(${config.BACKEND_URL}/${data.cover})` }}
			// onMouseEnter={onMouseEnter}
			// onMouseLeave={onMouseLeave}
		>
			<div>앨범 : {data.album}</div>
			<div>가수 : {data.singer}</div>
			<div>배급사 : {data.supply}</div>
		</div>
	);
};

export default Item_Mainpage;

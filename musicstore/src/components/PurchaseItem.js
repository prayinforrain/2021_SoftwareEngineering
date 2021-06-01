import * as config from './Config.js';
import '../style/purchase.css';
import axios from 'axios';

const PurchaseItem = ({ item, setItem, onClose }) => {
	const onPurchase = () => {};
	const onWishlist = () => {};
	const onCart = () => {};
	return (
		<div id="purchase_container">
			<div id="purchase_inner_container">
				<div className="upper_container">
					<div className="cover" style={{ backgroundImage: `url(${config.BACKEND_URL}/${item.cover.split('\\').join('/')})` }} />
					<div className="info_container">
						<div className="info">
							<span>앨범 : </span>
							<span>{item.album}</span>
						</div>
						<div className="info">
							<span>가수 : </span>
							<span>{item.singer}</span>
						</div>
						<div className="info">
							<span>배급사 : </span>
							<span>{item.supply}</span>
						</div>
						<div className="info">
							<span>발매일 : </span>
							<span>{item.released}</span>
						</div>
						<div className="info">
							<span>가격 : </span>
							<span>{item.price}</span>
						</div>
						<div className="info">
							<span>수량 : </span>
							<input type="number" defaultValue="1" min="1" required style={{ width: '30px' }} />
						</div>
					</div>
				</div>
				<div className="lower_container">
					<div className="purchase_button pbutton">구매하기</div>
					<div className="wishlist_button pbutton">찜하기</div>
					<div className="cart_button pbutton">장바구니</div>
					<div className="cancel_button pbutton" onClick={onClose}>
						취소하기
					</div>
				</div>
			</div>
		</div>
	);
};
export default PurchaseItem;

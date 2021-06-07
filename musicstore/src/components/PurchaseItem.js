import * as config from './Config.js';
import '../style/purchase.css';
import axios from 'axios';
import { useState } from 'react';

const PurchaseItem = ({ setPurchase, setBuyList, item, setItem, onClose }) => {
	const userID = window.sessionStorage.id;
	const [quantity, setQuantity] = useState(1);
	const isLoggedIn = () => {
		if (userID) {
			return true;
		}
		return false;
	};
	const onPurchase = () => {
		if (isLoggedIn()) {
			onClose();
			setPurchase(true);
			item.quantity = quantity;
			setBuyList([item]);
		} else {
			alert('로그인을 해야 구매가 가능합니다!');
			onClose();
		}
	};
	const onWishlist = () => {
		if (isLoggedIn()) {
			axios
				.post(`${config.BACKEND_URL}/wishlist`, { itemID: item.id, userID })
				.then(res => {
					alert('상품이 찜 목록에 추가 되었습니다!');
					onClose();
				})
				.catch(err => {
					alert('이미 등록된 상품입니다!');
					onClose();
				});
		} else {
			alert('로그인을 해야 찜 목록에 추가할 수 있습니다!');
			onClose();
		}
	};
	const onCart = () => {
		if (isLoggedIn()) {
			console.log('hi');
			axios
				.post(`${config.BACKEND_URL}/checkcart/`, { userID, itemID: item.id })
				.then(res => {
					if (res.data) {
						alert('이미 장바구니에 등록된 상품입니다!');
					} else {
						axios.post(`${config.BACKEND_URL}/addcart`, { itemID: item.id, userID, quantity: quantity }).then(res => {
							alert('장바구니 등록이 완료되었습니다!');
						});
					}
					onClose();
				})
				.catch(err => console.error(err));
		} else {
			alert('로그인을 해야 장바구니가 이용 가능합니다!');
			onClose();
		}
	};
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
							<input
								type="number"
								onChange={e => {
									setQuantity(e.target.value);
								}}
								defaultValue="1"
								min="1"
								required
								style={{ width: '30px' }}
							/>
						</div>
					</div>
				</div>
				<div className="lower_container">
					<div className="purchase_button pbutton" onClick={onPurchase}>
						구매하기
					</div>
					<div className="wishlist_button pbutton" onClick={onWishlist}>
						찜하기
					</div>
					<div className="cart_button pbutton" onClick={onCart}>
						장바구니
					</div>
					<div className="cancel_button pbutton" onClick={onClose}>
						취소하기
					</div>
				</div>
			</div>
		</div>
	);
};
export default PurchaseItem;

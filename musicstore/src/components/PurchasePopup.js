import axios from 'axios';

const PurchasePopup = ({ buyList, onClose }) => {
	const prices = buyList.map(el => el.price * el.quantity).reduce((acc, el) => (acc += el), 0);
	const fee = buyList.map(el => el.fee).sort((a, b) => b - a)[0];
	const kakaoPay = () => {
		console.log('kakaopay');
		axios.post('https://kapi.kakao.com/v1/payment/ready').then(res => console.log(res));
	};
	return (
		<div id="buy_container">
			<div id="buy_popup">
				<h2>구매하기</h2>
				<div id="list_container">
					<div id="list_header">
						<div className="buy_album">앨범 이름</div>
						<div className="buy_price">가격</div>
						<div className="buy_quantity">수량</div>
						<div className="buy_fee">배송비</div>
					</div>
					<div id="buy_list">
						{buyList.map(el => (
							<div className="buy_content">
								<div className="buy_album">{el.album}</div>
								<div className="buy_price">{el.price}</div>
								<div className="buy_quantity">{el.quantity}</div>
								<div className="buy_fee">{el.fee}</div>
							</div>
						))}
					</div>
					<div id="total_price" onClick={kakaoPay}>
						앨범 가격 {prices}원 배송비 {fee}원 총 가격 : {prices + fee}
					</div>
				</div>
				<div id="buy_button">카카오페이 구매하기</div>
				<div id="buy_cancel" onClick={onClose}>
					취소하기
				</div>
			</div>
		</div>
	);
};

export default PurchasePopup;

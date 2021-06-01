import React from 'react';

const Tracking = () => {
	return (
		<div id="content_container" className="member_info">
			<h1>주문/배송 조회</h1>
			<div id="tracking_box">
				<div className="tracking_line">
					<div className="tracking_no">주문번호</div>
					<div className="tracking_name">상품 이름</div>
					<div className="tracking_count">갯수</div>
					<div className="tracking_price">가격</div>
					<div className="tracking_status">주문상태</div>
				</div>
				<div className="tracking_line">
					<div className="tracking_no">2021041100001</div>
					<div className="tracking_name">아무 노래</div>
					<div className="tracking_count">2</div>
					<div className="tracking_price">24000</div>
					<div className="tracking_status">배송중</div>
				</div>
				<div className="tracking_line">
					<div className="tracking_no">2021040300031</div>
					<div className="tracking_name">라는 이름의</div>
					<div className="tracking_count">1</div>
					<div className="tracking_price">12000</div>
					<div className="tracking_status">입금완료</div>
				</div>
				<div className="tracking_line">
					<div className="tracking_no">2021032800135</div>
					<div className="tracking_name">노래가 어딨음</div>
					<div className="tracking_count">1</div>
					<div className="tracking_price">11800</div>
					<div className="tracking_status">입금완료</div>
				</div>
			</div>
		</div>
	);
};

export default Tracking;

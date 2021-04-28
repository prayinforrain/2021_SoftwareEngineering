import React from "react";

const Tracking = () => {
    return (
        <div id="main">
            <div id="main_container">
                <div class="menu">
                    <h3>menu</h3>
                    <hr/>
                    <ul>
                        <li>
                            <a href="/mypage">회원정보</a>
                        </li>
                        <li>
                            <a href="/mypage/tracking">주문/배송 조회</a>
                        </li>
                        <li>
                            <a href="/mypage/wishlist">찜목록</a>
                        </li>
                        <li>
                            <a href="/mypage/cart">장바구니</a>
                        </li>
                        <li>
                            <a href="/mypage/service_center">내 문의</a>
                        </li>
                    </ul>
                </div>
                <div id="content_container">
                    <h1>주문/배송 조회</h1>
                    <div id="tracking_box">
                        <div class="tracking_line">
                            <div class="tracking_no">주문번호</div>
                            <div class="tracking_name">상품 이름</div>
                            <div class="tracking_count">갯수</div>
                            <div class="tracking_price">가격</div>
                            <div class="tracking_status">주문상태</div>
                        </div>
                        <div class="tracking_line">
                            <div class="tracking_no">2021041100001</div>
                            <div class="tracking_name">아무 노래</div>
                            <div class="tracking_count">2</div>
                            <div class="tracking_price">24000</div>
                            <div class="tracking_status">배송중</div>
                        </div>
                        <div class="tracking_line">
                            <div class="tracking_no">2021040300031</div>
                            <div class="tracking_name">라는 이름의</div>
                            <div class="tracking_count">1</div>
                            <div class="tracking_price">12000</div>
                            <div class="tracking_status">입금완료</div>
                        </div>
                        <div class="tracking_line">
                            <div class="tracking_no">2021032800135</div>
                            <div class="tracking_name">노래가 어딨음</div>
                            <div class="tracking_count">1</div>
                            <div class="tracking_price">11800</div>
                            <div class="tracking_status">입금완료</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tracking;

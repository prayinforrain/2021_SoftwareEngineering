import React from "react";

const Cart = () => {
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
                    <h1>장바구니</h1>
                    <div id="cart_box">
                        <div class="cart_line">
                            <div class="cart_check"><input type="checkbox" name="cart_selectAll"/></div>
                            <div class="cart_name">상품 이름</div>
                            <div class="cart_artist">아티스트명</div>
                            <div class="cart_publish">배급사</div>
                            <div class="cart_count">수량</div>
                            <div class="cart_price">가격</div>
                        </div>
                        <div class="cart_line">
                            <div class="cart_check"><input type="checkbox" name="cart_select"/></div>
                            <div class="cart_name">앨범이름</div>
                            <div class="cart_artist">가수</div>
                            <div class="cart_publish">(주)빅배급맨</div>
                            <div class="cart_count"><input type="number" name="product_count" value="1"/></div>
                            <div class="cart_price">8000</div>
                        </div>
                        <div class="cart_line">
                            <div class="cart_check"><input type="checkbox" name="cart_select"/></div>
                            <div class="cart_name">다른 앨범 이름</div>
                            <div class="cart_artist">새 가수</div>
                            <div class="cart_publish">(주)빅배급맨</div>
                            <div class="cart_count"><input type="number" name="product_count" value="1"/></div>
                            <div class="cart_price">15000</div>
                        </div>
                    </div>
                    <div class="cart_button">
                        선택한 상품을: <button>구매</button><button>삭제</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

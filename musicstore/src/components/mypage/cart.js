import React from "react";
import { useState } from "react";

const Cart = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    function onTest() {
        setTotalPrice(totalPrice + 1000);
    }
    return (
        <div id="content_container">
            <h1>장바구니</h1>
            <button onClick={onTest}>테스트용 1000원증가</button>
            <div id="cart_box">
                <div className="cart_line">
                    <div className="cart_check">
                        <input type="checkbox" name="cart_selectAll" />
                    </div>
                    <div className="cart_name">상품 이름</div>
                    <div className="cart_artist">아티스트명</div>
                    <div className="cart_publish">배급사</div>
                    <div className="cart_count">수량</div>
                    <div className="cart_price">가격</div>
                </div>
                <div className="cart_line">
                    <div className="cart_check">
                        <input type="checkbox" name="cart_select" />
                    </div>
                    <div className="cart_name">앨범이름</div>
                    <div className="cart_artist">가수</div>
                    <div className="cart_publish">(주)빅배급맨</div>
                    <div className="cart_count">
                        <input type="number" name="product_count" value="1" />
                    </div>
                    <div className="cart_price">8000</div>
                </div>
                <div className="cart_line">
                    <div className="cart_check">
                        <input type="checkbox" name="cart_select" />
                    </div>
                    <div className="cart_name">다른 앨범 이름</div>
                    <div className="cart_artist">새 가수</div>
                    <div className="cart_publish">(주)빅배급맨</div>
                    <div className="cart_count">
                        <input type="number" name="product_count" value="1" />
                    </div>
                    <div className="cart_price">15000</div>
                </div>
            </div>
            <div id="cart_box_footer">
                <div id="cart_total">
                    총 : <span id="cart_total_price">{totalPrice}</span>원
                </div>
                <div className="cart_button">
                    선택한 상품을: <button>구매</button>
                    <button>삭제</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;

import React from "react";
import '../style/item_info.css';
import {useState} from "react";

import test_img from '../img/01.jpg'; // 테스트용

const ItemInfo = () => {
    const [itemCount, setItemCount] = useState(1);

    // 수량 state 조절하는 부분
    function onCountChange(event) {
        const {
            target: {value}
        } = event;
        setItemCount(value);
        //console.log(value + ', isNan = ' + isNaN(itemCount));
    }

    function increaseCount() {
        if(!isNaN(itemCount)) {
            setItemCount(Number(itemCount) + 1);
        } else {
            setItemCount(1);
        }
    }

    function decreaseCount() {
        if(!isNaN(itemCount)) {
            if(itemCount > 0) setItemCount(Number(itemCount) - 1);
            else setItemCount(0);
        } else {
            setItemCount(1);
        }
        if(itemCount < 0) setItemCount(0);
    }
    // 수량 state 조절하는 부분 끝

    return (
        <div id="main">
            <div class="body_container">
                <div class="inner_body">
                    <div id="item_header">
                        <div id="item_header_img">
                            <div id="item_header_category">
                                홈 &gt; 최신음악
                            </div>
                            <div id="item_img">
                                <img src={test_img}/>
                            </div>
                        </div>
                        <div id="item_header_info">
                            <div id="item_header_title">
                                IU 5th Album 'LILAC'
                            </div>
                            <div id="item_header_price">
                                12000원
                            </div>
                            <div id="item_header_empty"></div>
                            <div id="item_count_container">
                                <button class="item_count_btn" onClick={decreaseCount}>-</button>
                                <input
                                name="item_count"
                                id="item_count"
                                type="number"
                                maxLength="3"
                                value={itemCount}
                                onChange={onCountChange}/>
                                <button class="item_count_btn" onClick={increaseCount}>+</button>
                            </div>
                            <div id="item_header_buy">
                                <button id="item_add_wishlist">장바구니</button>
                                <button id="item_buy">구매</button>
                            </div>
                        </div>
                    </div>
                    <div id="item_detail">
                        제품 상세 설명
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemInfo;
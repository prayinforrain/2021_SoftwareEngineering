import React from "react";
import { Link } from "react-router-dom";
import "../../style/common.css";

const MypageMenu = () => {
    return (
        <div className="menu">
            <h3>menu</h3>
            <hr />
            <ul>
                <li>
                    <Link to="/mypage">회원정보</Link>
                </li>
                <li>
                    <Link to="/mypage/tracking">주문/배송 조회</Link>
                </li>
                <li>
                    <Link to="/mypage/wishlist">찜목록</Link>
                </li>
                <li>
                    <Link to="/mypage/cart">장바구니</Link>
                </li>
                <li>
                    <Link to="/mypage/service_center">내 문의</Link>
                </li>
                <li>
                    <Link to="/mypage/destination">배송지 설정</Link>
                </li>
            </ul>
        </div>
    );
};

export default MypageMenu;

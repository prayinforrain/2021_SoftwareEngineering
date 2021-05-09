import React from "react";
import { Link } from "react-router-dom";
import "../style/common.css";
const Header = ({ openSignup, openLogin }) => {
    //console.log(openSignup);
    return (
        <header>
            <div className="header_container">
                <div id="logo">
                    <Link to="/" className="logo_link" />
                </div>
                <div id="search">
                    <input type="text" placeholder="앨범, 가수, 제작사..." />
                    <button>검색</button>
                </div>
                <div className="menu">
                    <div id="login" onClick={openLogin}>
                        로그인
                    </div>
                    <div id="signup" onClick={openSignup}>
                        회원가입
                    </div>
                    <div id="mapage">
                        <Link to="/mypage">마이페이지</Link>
                    </div>
                    <div id="shopping">
                        <a href="/mypage/cart">장바구니</a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

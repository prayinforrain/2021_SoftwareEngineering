import React from "react";
import "../style/common.css";
const Header = () => {
    return (
        <header>
            <div class="header_container">
                <div id="logo"></div>
                <div id="search">
                    <input type="text" placeholder="앨범, 가수, 제작사..." />
                    <button>검색</button>
                </div>
                <div class="menu">
                    <div id="login">
                        <a
                            href="./login.html"
                            onclick="window.open(this.href, '_blank', 'width=300px ,height=200px ,toolbars=no,scrollbars=no'); return false;"
                        >
                            로그인
                        </a>
                    </div>
                    <div id="signup">
                        <a
                            href="./signup.html"
                            onclick="window.open(this.href, '_blank', 'width=300px ,height=500px ,toolbars=no,scrollbars=no'); return false;"
                        >
                            회원가입
                        </a>
                    </div>
                    <div id="mapage">
                        <a href="./mypage.html">마이페이지</a>
                    </div>
                    <div id="shopping>">
                        <a href=".">장바구니</a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

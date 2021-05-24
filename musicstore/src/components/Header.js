import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../style/common.css";
import axios from 'axios';
const Header = ({ user, onLogout, openSignup, openLogin }) => {
    function logout() {
        axios.withCredentials = true;
        axios.get('http://localhost:3001/logout')
            .then(res =>{
                alert('logout 되었습니다');
                console.log(res);
                onLogout();
            })
    }
    return (
        <header>
            <div className="header_container" >
                <div id="logo">
                    <Link to="/" className="logo_link" />
                </div>
                <div id="search" style={user.userID==='admin'?{display:'none'}:{}}>
                    <input type="text" placeholder="앨범, 가수, 제작사..." />
                    <button>검색</button>
                </div>
                {(typeof user === 'object') ? 
                    (user.userID === 'admin' ? (
                        <div className="menu">
                            <div>관리자님 환영합니다.</div>
                            <div onClick={onLogout}>관리자 로그아웃 </div>
                        </div>
                    ) : (
                        <div className="menu">
                        <div id="welcome">{user.name}님 환영합니다.</div>
                        <div id="mapage">
                            <Link to="/mypage">마이페이지</Link>
                        </div>
                        <div id="shopping">
                            <Link href="/mypage/cart">장바구니</Link>
                        </div>
                        <div id="logout" onClick={logout}>로그아웃</div>
                    </div>
                    )) : (
                        <div className="menu">
                            <div id="login" onClick={openLogin}>로그인</div>
                            <div id="signup" onClick={openSignup}>회원가입</div>
                            <div id="mapage">
                                <Link to="/mypage">마이페이지</Link>
                            </div>
                            <div id="shopping">
                                <Link to="/mypage/cart">장바구니</Link>
                            </div>
                        </div>)}
                </div>
        </header>
    );
};

export default Header;

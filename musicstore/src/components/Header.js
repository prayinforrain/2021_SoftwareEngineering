import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../style/common.css';
import axios from 'axios';
import * as config from './Config';

const Header = ({ user, onLogout, openSignup, openLogin }) => {
	const history = useHistory();
	async function onSearch() {
		var keyword = document.getElementById("search_keyword").value;
		var searchOption = document.getElementById("search_option").value;
		if(keyword !== "") {
			history.push('/search/' + searchOption + '/' + keyword);
			history.go(0);
		} else {
			alert('검색어를 입력해주세요.');
		}
	}

	function logout() {
		axios.withCredentials = true;
		axios.get(`${config.BACKEND_URL}/logout`).then(res => {
			alert('logout 되었습니다');
			console.log(res);
			onLogout();
		});
	}
	return (
		<header>
			<div className="header_container">
				<div id="logo">
					<Link to="/" className="logo_link" />
				</div>
				<div id="search" style={user.userID === 'admin' ? { display: 'none' } : {}}>
					<select id="search_option">
						<option value="0">통합검색</option>
						<option value="1">제목</option>
						<option value="2">가수</option>
						<option value="3">배급사</option>
						<option value="4">장르</option>
					</select>
					<input type="text" placeholder="앨범, 가수, 제작사..." id="search_keyword" />
					<button onClick={onSearch}>검색</button>
				</div>
				{typeof user === 'object' ? (
					user.userID === 'admin' ? (
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
								<Link to="/mypage/cart">장바구니</Link>
							</div>
							<div id="logout" onClick={logout}>
								로그아웃
							</div>
						</div>
					)
				) : (
					<div className="menu">
						<div id="login" onClick={openLogin}>
							로그인
						</div>
						<div id="signup" onClick={openSignup}>
							회원가입
						</div>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;

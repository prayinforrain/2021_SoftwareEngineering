import React from 'react';
import axios from 'axios';
import '../style/modal.css';
import { useHistory } from 'react-router-dom';
import * as config from './Config';

const Login = ({ user, onLogin, onClose }) => {
	const history = useHistory();
	console.log(history);
	const LoginHandler = e => {
		e.preventDefault();

		const id = document.getElementById('loginId');
		const password = document.getElementById('loginPassword');
		axios.defaults.withCredentials = true;
		axios({
			method: 'POST',
			url: `${config.BACKEND_URL}/login`, //'http://localhost:3001/login',
			data: {
				id: id.value,
				password: password.value,
			},
		})
			.then(response => {
				console.log('login axios 성공');
				console.log(response);
				const data = response.data;
				if (data.id) {
					console.log(data);
					onLogin(data);
					alert(data.name + '님 환영합니다!');
					window.sessionStorage.setItem('id', data.userID);
					window.location.href = '/';
				} else {
					alert('로그인 정보가 일치하지 않습니다');
					id.value = '';
					password.value = '';
					id.focus();
					return;
				}
			})
			.catch(err => {
				console.log('login axios 실패');
				console.error(err);
			});
	};

	return (
		<div id="member_container" style={{ padding: '20px' }}>
			<div className="login_form_container">
				<form
					id="login_form"
					name="login_form"
					action="/login"
					method="post"
					onSubmit={e => {
						LoginHandler(e);
					}}
				>
					<div className="form_title_div">
						<p className="form_title_p" style={{ textAlign: 'center' }}>
							로그인
						</p>
					</div>
					<div>
						<div>
							<input
								id="loginId"
								type="text"
								name="id"
								className="form_input"
								placeholder="ID"
								style={{ marginBottom: '40px' }}
							/>
						</div>
						<div>
							<input id="loginPassword" type="password" name="password" className="form_input" placeholder="비밀번호" />
						</div>
					</div>
					<div style={{ textAlign: 'center', marginTop: '10px' }}>
						<button type="submit" className="form_submit_button">
							확인
						</button>
						<button onClick={onClose}>취소</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;

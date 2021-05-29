import React from 'react';
import '../style/modal.css';
import axios from 'axios';
import * as config from './Config';
import Post from './Manage/Post';

const SignUp = ({ onLogin, onClose }) => {
	const idCheck = () => {
		const id = document.getElementById('signUpId').value;
		if (id.length >= 6 && id.length <= 12) {
			return true;
		} else {
			return false;
		}
	};
	const passwordCheck = () => {
		const password = document.getElementById('signUpPassword').value;
		if (password.length >= 8 && password.length <= 12) {
			return true;
		} else {
			return false;
		}
	};
	const emailCheck = () => {
		var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
		const email = document.getElementById('signUpEmail').value;
		if (email.match(regExp) != null) {
			return true;
		} else {
			return false;
		}
	};
	const formCheck = () => {
		const form = document.getElementById('signup_form');
		const { username, id, email, password, password2, sex, birth, adult } = form;
		if (password.value !== password2.value) {
			alert('비밀번호를 확인해주세요');
			return;
		}
		if (!(username.value && id.value && email.value && password && sex && birth && adult)) {
			alert('입력하지 않은 항목이 있습니다.');
			return;
		}
		if (!idCheck()) {
			alert('ID는 6~12글자로 입력해주세요');
			return;
		}
		if (!passwordCheck()) {
			alert('Password는 8~12글자로 입력해주세요');
			return;
		}
		if (!emailCheck()) {
			alert('Email 양식을 확인해주세요');
			return;
		}
		axios({
			method: 'POST',
			url: `${config.BACKEND_URL}/signup_check`,
			data: {
				username: username.value,
				id: id.value,
				email: email.value,
				password: password.value,
				sex: sex.value,
				birth: birth.value,
				adult: adult.checked,
			},
		}).then(res => {
			if (res.data === 'both') {
				alert('아이디와 이메일 모두 중복됩니다!');
				form.querySelector('#signUpId').value = '';
				form.querySelector('#signUpId').focus();
				form.querySelector('#signUpEmail').value = '';
				form.querySelector('#signUpEmail').focus();
			} else if (res.data === 'email') {
				alert('이메일이 중복 됩니다!');
				form.querySelector('#signUpEmail').value = '';
				form.querySelector('#signUpEmail').focus();
			} else if (res.data === 'id') {
				alert('아이디가 중복 됩니다!');
				form.querySelector('#signUpId').value = '';
				form.querySelector('#signUpId').focus();
			} else {
				axios({
					method: 'POST',
					url: `${config.BACKEND_URL}/signup`,
					data: {
						username: username.value,
						id: id.value,
						email: email.value,
						password: password.value,
						sex: sex.value,
						birth: birth.value,
						adult: adult.checked,
					},
				})
					.then(res => {
						console.log(res.data);
						onClose();
					})
					.then(res => {
						axios({
							method: 'POST',
							url: `${config.BACKEND_URL}/login`, //'http://localhost:3001/login',
							data: {
								id: id.value,
								password: password.value,
							},
						}).then(response => {
							console.log('login axios 성공');
							console.log(response);
							const data = response.data;
							if (data.id) {
								console.log(data);
								onLogin(data);
								alert(data.name + '님 환영합니다!');
								window.sessionStorage.setItem('id', data.userID);
								window.location.href = '/';
							}
						});
					});
			}
		});

		// 	.catch(err => {
		// 		let idCheck = false;
		// 		let emailCheck = false;
		// 		axios
		// 			.get(`${config.BACKEND_URL}/id_check/${id.value}`)
		// 			.then(res => {
		// 				console.log(res.data);
		// 				if (res.data) {
		// 					idCheck = true;
		// 				}
		// 				axios.get(`${config.BACKEND_URL}/email_check/${email.value}`).then(res => {
		// 					if (res.data) {
		// 						emailCheck = true;
		// 					}
		// 				});
		// 			})
		// 			.then(() => {
		// 				if (idCheck && emailCheck) {
		// 					alert('아이디와 Email이 중복됩니다!');
		// 					form.querySelector('#signUpId').value = '';
		// 					form.querySelector('#signUpId').focus();
		// 					form.querySelector('#signUpEmail').value = '';
		// 					form.querySelector('#signUpEmail').focus();
		// 				} else if (idCheck) {
		// 					alert('아이디가 중복됩니다!');
		// 					form.querySelector('#signUpId').value = '';
		// 					form.querySelector('#signUpId').focus();
		// 				} else if (emailCheck) {
		// 					alert('이메일이 중복됩니다!');
		// 					form.querySelector('#signUpEmail').value = '';
		// 					form.querySelector('#signUpEmail').focus();
		// 				}
		// 			});
		// 	});
	};

	return (
		<div id="member_container">
			<div className="signup_form_container">
				<form id="signup_form" name="signup_form">
					<div className="form_title_div">
						<p className="form_title_p">회원가입</p>
					</div>
					<div>
						<div>이름</div>
						<div>
							<input type="text" name="username" placeholder="이름을 입력하세요" className="form_input" required="true" />
						</div>
						<div className="form_text_alert_padding">
							<div id="alert_username" className="form_text_alert"></div>
						</div>
					</div>
					<div>
						<div>ID</div>
						<div>
							<input
								id="signUpId"
								type="text"
								name="id"
								placeholder="6글자 ~ 12글자"
								className="form_input"
								required="true"
							/>
						</div>
						<div className="form_text_alert_padding">
							<div id="alert_id" className="form_text_alert"></div>
						</div>
					</div>
					<div>
						<div>E-mail</div>
						<div>
							<input
								id="signUpEmail"
								type="email"
								name="email"
								placeholder="example@email.com"
								className="form_input"
								required="true"
							/>
						</div>
						<div className="form_text_alert_padding">
							<div id="alert_email" className="form_text_alert"></div>
						</div>
					</div>
					<div>
						<div>비밀번호</div>
						<div>
							<input
								id="signUpPassword"
								type="password"
								name="password"
								placeholder="8글자 ~ 12글자"
								className="form_input"
								required="true"
							/>
						</div>
						<div className="form_text_alert_padding">
							<div id="alert_password" className="form_text_alert"></div>
						</div>
					</div>
					<div>
						<div>비밀번호 확인</div>
						<div>
							<input
								type="password"
								name="password2"
								placeholder="비밀번호를 다시 입력하세요"
								className="form_input"
								required="true"
							/>
						</div>
						<div className="form_text_alert_padding">
							<div id="alert_password2" className="form_text_alert"></div>
						</div>
					</div>
					<div>
						<div>성별</div>
						<div>
							<label>
								<input type="radio" name="sex" value="male" /> 남
							</label>
							<label>
								<input type="radio" name="sex" value="female" /> 여
							</label>
						</div>
					</div>
					<div>
						<div>생일</div>
						<input name="birth" type="date" required="true" />
					</div>
					<div>
						<div>
							<span>성인 인증</span>
							<input name="adult" type="checkbox" />
						</div>
					</div>
					<div>
						<button
							className="form_submit_button"
							onClick={e => {
								e.preventDefault();
								formCheck();
							}}
						>
							확인
						</button>
						<button onClick={onClose}>취소</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;

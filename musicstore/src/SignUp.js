import React from "react";
import "../style/modal.css";

const SignUp = ({ onClose }) => {
    return (
        <div id="member_container">
            <div className="signup_form_container">
                <form
                    id="signup_form"
                    name="signup_form"
                    action="/cookie"
                    method="get"
                >
                    <div className="form_title_div">
                        <p className="form_title_p">회원가입</p>
                    </div>
                    <div>
                        <div>이름</div>
                        <div>
                            <input
                                type="text"
                                name="username"
                                placeholder="이름을 입력하세요"
                                className="form_input"
                            />
                        </div>
                        <div className="form_text_alert_padding">
                            <div
                                id="alert_username"
                                className="form_text_alert"
                            ></div>
                        </div>
                    </div>
                    <div>
                        <div>ID</div>
                        <div>
                            <input
                                type="text"
                                name="id"
                                placeholder="ID를 입력히세요"
                                className="form_input"
                            />
                        </div>
                        <div className="form_text_alert_padding">
                            <div
                                id="alert_id"
                                className="form_text_alert"
                            ></div>
                        </div>
                    </div>
                    <div>
                        <div>E-mail</div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail을 입력하세요"
                                className="form_input"
                            />
                        </div>
                        <div className="form_text_alert_padding">
                            <div
                                id="alert_email"
                                className="form_text_alert"
                            ></div>
                        </div>
                    </div>
                    <div>
                        <div>비밀번호</div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="비밀번호를 입력하세요"
                                className="form_input"
                            />
                        </div>
                        <div className="form_text_alert_padding">
                            <div
                                id="alert_password"
                                className="form_text_alert"
                            ></div>
                        </div>
                    </div>
                    <div>
                        <div>비밀번호 확인</div>
                        <div>
                            <input
                                type="password"
                                name="password2"
                                onfocus=""
                                placeholder="비밀번호를 다시 입력하세요"
                                className="form_input"
                            />
                        </div>
                        <div className="form_text_alert_padding">
                            <div
                                id="alert_password2"
                                className="form_text_alert"
                            ></div>
                        </div>
                    </div>
                    <div>
                        <div>성별</div>
                        <div>
                            <label>
                                <input type="radio" name="sex" value="male" />{" "}
                                남
                            </label>
                            <label>
                                <input type="radio" name="sex" value="female" />{" "}
                                여
                            </label>
                        </div>
                    </div>
                    <div>
                        <div>생일</div>
                        <input type="date" />
                    </div>
                    <div>
                        <div>성인 인증</div>
                        <div>
                            <button type="button">성인인증</button>
                        </div>
                    </div>
                    <div>
                        <button
                            className="form_submit_button"
                            onClick="login()"
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

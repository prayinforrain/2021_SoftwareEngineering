import React from "react";
import "../style/modal.css";

const Login = ({ onClose }) => {
    return (
        <div id="member_container" style={{ padding: "20px" }}>
            <div className="login_form_container">
                <form
                    id="login_form"
                    name="login_form"
                    action="/cookie"
                    method="get"
                >
                    <div className="form_title_div">
                        <p
                            className="form_title_p"
                            style={{ textAlign: "center" }}
                        >
                            로그인
                        </p>
                    </div>
                    <div>
                        <div>
                            <input
                                type="text"
                                name="id"
                                className="form_input"
                                placeholder="ID"
                                style={{ marginBottom: "40px" }}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                className="form_input"
                                placeholder="비밀번호"
                            />
                        </div>
                    </div>
                    <div style={{ textAlign: "center", marginTop: "10px" }}>
                        <button type="button" className="form_submit_button">
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

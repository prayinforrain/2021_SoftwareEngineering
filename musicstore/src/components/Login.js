import React, {useState} from "react";
import axios from 'axios';
import "../style/modal.css";


const Login = ({ onClose }) => {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const onChange = (e) => {
        const {target : {name, value}} = e;
        if(name === "id") setId(value);
        if(name === "password") setPw(value);
    }
    const LoginHandler =(e) => {
        if(id == "" || pw == "") {
            console.log("empty field");
        } else {
            //대충 로그인 한다는 내용
        }
    }
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
                                value={id}
                                onChange={onChange}
                                style={{ marginBottom: "40px" }}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                className="form_input"
                                onChange={onChange}
                                value={pw}
                                placeholder="비밀번호"
                            />
                        </div>
                    </div>
                    <div style={{ textAlign: "center", marginTop: "10px" }}>
                        <button type="button" className="form_submit_button" onClick={LoginHandler}>
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

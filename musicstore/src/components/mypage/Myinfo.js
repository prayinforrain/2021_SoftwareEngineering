import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";

const Myinfo = ( {userToken} ) => {
    /*
    필요한 것 : Router를 통해 로그인한 사용자의 고유번호라던지
    그런 인자를 받을 필요가 있음
    */
    //서버로부터 기존 정보를 받아오기 위한 State
    const [userInfo, setUserInfo] = useState({
        ID : "null",
        Name : "null",
        Email : "null@null",
        Veryfied : false,
        Sex : "M", //M, F
        Birth : "1970-01-01"
    })
    //const {ID, Name, Email, Veryfied, Sex, Birth} = userInfo;
    //유저가 수정한 정보를 담을 State
    const [userPassword, setUserPassword] = useState("");
    const [userPwConfirm, setUserPwConfirm] = useState("");

    const fetchUserInfo = async() => {
        const res = await axios.post('http://localhost:3001/user_info/', {
            userToken
        });
        setUserInfo(res.data);
        console.log(userInfo);
    };
    useEffect(() => {
        fetchUserInfo();
    }, [])
    const onSubmit = async(e) => {
        e.preventDefault();
        if(userPwConfirm === userPassword) {
            console.log("clicked");
        } else console.log("비밀번호");
    }
    
    const onChange = (e) => {
        const {target : {name, value}} = e;
        //console.log("onChange() called on field: ", name, " changed to ", value);
        if(name === "Password") {
            setUserPassword(value);
        } else if(name === "PasswordConfirm") {
            setUserPwConfirm(value);
        } else {
            setUserInfo({
                ...userInfo,
                [name]: value
            });
        }
    }
    return (
        <div id="content_container">
            <h1>회원정보 수정</h1>
            <hr />
            <form id="my_profile" onSubmit={onSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td className="profile_label">아이디 : </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="ID"
                                    value= {userInfo.ID}
                                    disabled
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="profile_label">비밀번호 변경 : </td>
                            <td>
                                <input name="Password" type="password" placeholder="새 비밀번호" value={userPassword} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="profile_label">비밀번호 확인 : </td>
                            <td>
                                <input
                                    type="password"
                                    name="PasswordConfirm"
                                    placeholder="새 비밀번호 확인"
                                    value={userPwConfirm}
                                    onChange={onChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="profile_label">이름 : </td>
                            <td>
                                <input type="text" name="Name" placeholder="이름" value={userInfo.Name} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="profile_label">E-mail : </td>
                            <td>
                                <input type="email" name="Email" placeholder="E-mail" value={userInfo.Email} onChange = {onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ textAlign: "center" }}>
                                추가 정보
                            </td>
                        </tr>
                        <tr>
                            <td className="profile_label">성인 인증 여부 : </td>
                            <td>
                                <input type="checkbox" value={userInfo.Veryfied} disabled />{" "}
                                <button disabled>성인인증</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="profile_label">성별 : </td>
                            <td>
                                <label>
                                    <input
                                        type="radio"
                                        name="sex"
                                        value="M"
                                        checked={userInfo.Sex === "M"}
                                        onChange={onChange}
                                    />
                                    남성
                                </label>
                                <label>
                                    <input type="radio" name="sex" value="F"
                                    checked={userInfo.Sex === "F"} onChange={onChange} /> 여성
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td className="profile_label">생년월일 : </td>
                            <td>
                                <input type="date" name="Birth" value={userInfo.Birth} onChange = {onChange}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="profile_button">
                    <input type="submit" value="수정"/>
                    <button>취소</button>
                </div>
            </form>
        </div>
    );
};

export default Myinfo;

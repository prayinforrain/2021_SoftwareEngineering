import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import {useHistory} from "react-router-dom"

const Myinfo = () => {
    /*
        수정 가능한 정보가 생긴다면 userInfo State의 구조를 바꿔주어야 함
        물론 백엔드에서도 쿼리문 바꿔야함
    */


    //비로그인시 메인페이지로 리디렉션 시키기 위한 페이지
    const history = useHistory();
    //서버로부터 기존 정보를 받아오기 위한 State
    const [userInfo, setUserInfo] = useState({
        Key: 0,
        ID : "null",
        Name : "null",
        Email : "null@null",
        isAdult : false,
        Sex : "male", //male, female
        Birth : "1970-01-01"
    })
    //const {ID, Name, Email, isAdult, Sex, Birth} = userInfo;
    //유저가 수정한 정보를 담을 State
    const [userPassword, setUserPassword] = useState("");
    const [userPwConfirm, setUserPwConfirm] = useState("");
    const [userCurrentPassword, setUserCurrentPassword] = useState("");

    const fetchUserInfo = async() => {
        const res = await axios.get('http://localhost:3001/login');
        //console.log(res.data);
        if (res.data !== "not logged in") {
            setUserInfo({
                Key: res.data.id,
                ID: res.data.userID,
                Name: res.data.name,
                Email: res.data.email,
                isAdult: res.data.isAdult,
                Sex: res.data.gender,
                Birth: res.data.birth
            });
        } else {
            //로그인 정보가 없으면 메인페이지로 리다이렉트
            alert("로그인이 필요합니다.");
            history.push('/');
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, [])

    const onSubmit = async(e) => {
        e.preventDefault();
        if(userPwConfirm === userPassword) {
            //비밀번호 변경 칸이 비어있는 경우
            //백엔드에서 "new"값이 empty string인 경우를 처리하도록 해서 비밀번호는 바뀌지 않음
            const infoChange = await axios.post('http://localhost:3001/changeinfo', {
                userID: userInfo.Key,
                current: userCurrentPassword,
                new : userPassword,
                name: userInfo.Name,
                email: userInfo.Email,
                gender: userInfo.Sex,
                birth: userInfo.Birth
            });
            //console.log(infoChange);
            if(infoChange.status === 200) {
                //정상 처리됨
                alert('정보가 성공적으로 변경되었습니다.');
                fetchUserInfo();
                setUserCurrentPassword("");
                setUserPassword("");
                setUserPwConfirm("");
            } else if(infoChange.status === 202) {
                //현재 패스워드를 잘못 입력
                alert('현재 비밀번호가 정확하지 않습니다.');
            } else {
                alert('오류가 발생하였습니다');
                console.log("error occured");
                console.log(infoChange);
            }
        } else {
            alert("변경할 비밀번호를 정확히 입력해주세요");
        }
    }
    
    const onChange = (e) => {
        const {target : {name, value}} = e;
        //console.log("onChange() called on field: ", name, " changed to ", value);
        if(name === "Password") {
            setUserPassword(value);
        } else if(name === "PasswordConfirm") {
            setUserPwConfirm(value);
        } else if(name === "CurrentPassword") {
            setUserCurrentPassword(value);
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
                            <td className="profile_label">현재 비밀번호 : </td>
                            <td>
                                <input name="CurrentPassword" type="password" placeholder="현재 비밀번호" value={userCurrentPassword} onChange={onChange}/>
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
                                <input type="checkbox" value={userInfo.isAdult} disabled />{" "}
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
                                        value="male"
                                        checked={userInfo.Sex === "male"}
                                        onChange={onChange}
                                    />
                                    남성
                                </label>
                                <label>
                                    <input type="radio" name="sex" value="female"
                                    checked={userInfo.Sex === "female"} onChange={onChange} /> 여성
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

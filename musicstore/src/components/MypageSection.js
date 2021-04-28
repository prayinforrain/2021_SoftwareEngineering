import React from "react";

const MypageSection = () => {
    return (
        <div id="main">
            <div id="main_container">
                <div class="menu">
                    <h3>menu</h3>
                    <hr />
                    <ul>
                        <li>
                            <a href="/mypage">회원정보</a>
                        </li>
                        <li>
                            <a href="/mypage/tracking">주문/배송 조회</a>
                        </li>
                        <li>
                            <a href="/mypage/wishlist">찜목록</a>
                        </li>
                        <li>
                            <a href="/mypage/cart">장바구니</a>
                        </li>
                        <li>
                            <a href="/mypage/service_center">내 문의</a>
                        </li>
                    </ul>
                </div>
                <div id="content_container">
                    <h1>회원정보 수정</h1>
                    <hr />
                    <form id="my_profile">
                        <table>
                            <tr>
                                <td class="profile_label">아이디 : </td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="ID"
                                        value="myID"
                                        disabled
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td class="profile_label">비밀번호 : </td>
                                <td>
                                    <input
                                        type="password"
                                        placeholder="비밀번호"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td class="profile_label">비밀번호 변경 : </td>
                                <td>
                                    <input
                                        type="password"
                                        placeholder="새 비밀번호"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td class="profile_label">비밀번호 확인 : </td>
                                <td>
                                    <input
                                        type="password"
                                        placeholder="새 비밀번호 확인"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td class="profile_label">이름 : </td>
                                <td>
                                    <input type="text" placeholder="이름" />
                                </td>
                            </tr>
                            <tr>
                                <td class="profile_label">E-mail : </td>
                                <td>
                                    <input type="email" placeholder="E-mail" />
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style={{ textAlign: "center" }}>
                                    추가 정보
                                </td>
                            </tr>
                            <tr>
                                <td class="profile_label">성인 인증 여부 : </td>
                                <td>
                                    <input type="checkbox" checked disabled />{" "}
                                    <button disabled>성인인증</button>
                                </td>
                            </tr>
                            <tr>
                                <td class="profile_label">성별 : </td>
                                <td>
                                    {" "}
                                    <label>
                                        <input
                                            type="radio"
                                            name="sex"
                                            value="M"
                                            checked
                                        />{" "}
                                        남성
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="sex"
                                            value="F"
                                        />{" "}
                                        여성
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td class="profile_label">생년월일 : </td>
                                <td>
                                    <input type="date" value="2021-03-01" />
                                </td>
                            </tr>
                        </table>
                        <div class="profile_button">
                            <button>수정</button>
                            <button>취소</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MypageSection;

import React from "react";

const Cs = () => {
    return (
        <div id="main">
            <div id="main_container">
                <div class="menu">
                    <h3>menu</h3>
                    <hr/>
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
                    <h1>문의 내역</h1>
                    <div id="qna_box">
                        <div class="qna_line">
                            <div class="qna_no">번호</div>
                            <div class="qna_title">문의 제목</div>
                            <div class="qna_postedat">질문 일시</div>
                            <div class="qna_answeredat">답변 일시</div>
                            <div class="qna_status">문의 상태</div>
                        </div>
                        <div class="qna_line">
                            <div class="qna_no">2</div>
                            <div class="qna_title">아이너무궁금하당</div>
                            <div class="qna_postedat">2021-04-14 17:02:08</div>
                            <div class="qna_answeredat">-</div>
                            <div class="qna_status">처리중</div>
                        </div>
                        <div class="qna_line">
                            <div class="qna_no">1</div>
                            <div class="qna_title">궁금해요ㅕ굼긍해빨리답변해주세요</div>
                            <div class="qna_postedat">2021-04-13 09:24:31</div>
                            <div class="qna_answeredat">2021-04-13 15:54:29</div>
                            <div class="qna_status">답변 완료</div>
                        </div>
                    </div>
                    <div id="qna_button">
                        <button>문의하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cs;

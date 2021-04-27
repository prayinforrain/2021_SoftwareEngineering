import React from "react";
import "../style/manager_page.css";

const ManagerSection = () => {
    return (
        <div id="main">
            <div class="body_container">
                <div class="inner_body">
                    <ul class="body_menu">
                        <li class="menu_notice active">공지 관리</li>
                        <li class="menu_banner">배너 관리</li>
                        <li class="menu_product">상품 관리</li>
                        <li class="menu_qna">Q&A 관리</li>
                        <li class="menu_faq">FAQ 관리</li>
                    </ul>
                    <div class="notice_board board">
                        <div class="notice">
                            <div class="notice_idx">번호</div>
                            <div class="notice_title notice_title_top">
                                제목
                            </div>
                            <div class="notice_date">날짜</div>
                        </div>
                    </div>
                    <div class="banner_board board">
                        <div class="banner">
                            <div class="banner_idx">번호</div>
                            <div class="banner_title banner_title_top">
                                제목
                            </div>
                            <div class="banner_date">날짜</div>
                        </div>
                    </div>
                    <div class="product_board board">
                        <div class="product">
                            <div class="product_idx">번호</div>
                            <div class="product_singer">가수</div>
                            <div class="product_title">앨범명</div>
                            <div class="product_genre">장르</div>
                            <div class="product_release_date">발매일</div>
                            <div class="product_publish">유통사</div>
                        </div>
                    </div>
                    <div class="qna_board board">
                        <div class="qna">
                            <div class="qna_idx">번호</div>
                            <div class="qna_title qna_title_top">제목</div>
                            <div class="qna_date">날짜</div>
                        </div>
                    </div>
                    <div class="faq_board board">
                        <div class="faq">
                            <div class="faq_idx">번호</div>
                            <div class="faq_title faq_title_top">제목</div>
                            <div class="faq_date">날짜</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="insert_button">
                <div class="left"></div>
                <div class="right"></div>
            </div>
            <div class="popup_background"></div>
            <div class="notice_modify_popup">
                <form action="#" id="notice_modify_form">
                    <div class="notice_popup_title_area">
                        <div class="notice_popup_text">제목</div>
                        <input type="text" id="notice_popup_title" />
                    </div>
                    <div class="notice_popup_detail_area">
                        <div class="notice_popup_text">내용</div>
                        <textarea
                            name="notice_popup_detail"
                            id="notice_popup_detail"
                        ></textarea>
                    </div>
                    <div class="notice_popup_ox">
                        <button>입력하기</button>
                        <button>취소하기</button>
                    </div>
                </form>
            </div>
            <div class="qna_modify_popup">
                <form action="#" id="qna_modify_form">
                    <div class="qna_popup_title_area">
                        <div class="qna_popup_text">제목</div>
                        <input type="text" id="qna_popup_title" />
                    </div>
                    <div class="qna_popup_detail_area">
                        <div class="qna_popup_text">내용</div>
                        <textarea
                            name="qna_popup_detail"
                            id="qna_popup_detail"
                        ></textarea>
                    </div>
                    <div class="qna_popup_ox">
                        <button>입력하기</button>
                        <button>취소하기</button>
                    </div>
                </form>
            </div>
            <div class="faq_modify_popup">
                <form action="#" id="faq_modify_form">
                    <div class="faq_popup_title_area">
                        <div class="faq_popup_text">제목</div>
                        <input type="text" id="faq_popup_title" />
                    </div>
                    <div class="faq_popup_detail_area">
                        <div class="faq_popup_text">내용</div>
                        <textarea
                            name="faq_popup_detail"
                            id="faq_popup_detail"
                        ></textarea>
                    </div>
                    <div class="faq_popup_ox">
                        <button>입력하기</button>
                        <button>취소하기</button>
                    </div>
                </form>
            </div>
            <div class="banner_modify_popup">
                <form action="#" id="banner_modify_form">
                    <div class="banner_popup_title_area">
                        <div class="banner_popup_text">제목</div>
                        <input type="text" id="banner_popup_title" />
                    </div>
                    <div class="banner_popup_detail_area">
                        <div class="banner_popup_text">내용</div>
                        <textarea
                            name="banner_popup_detail"
                            id="banner_popup_detail"
                        ></textarea>
                    </div>
                    <div class="banner_popup_ox">
                        <button>입력하기</button>
                        <button>취소하기</button>
                    </div>
                </form>
            </div>
            <div class="product_modify_popup">
                <form action="#" id="product_modify_form">
                    <div class="product_popup_singer_area">
                        <div class="product_popup_text">가수</div>
                        <input type="text" id="product_popup_singer" />
                    </div>
                    <div class="product_popup_title_area">
                        <div class="product_popup_text">앨범명</div>
                        <input type="text" id="product_popup_title" />
                    </div>
                    <div class="product_popup_genre_area">
                        <div class="product_popup_text">장르</div>
                        <input type="text" id="product_popup_genre" />
                    </div>
                    <div class="product_popup_release_date_area">
                        <div class="product_popup_text">발매일</div>
                        <input type="text" id="product_popup_release_date" />
                    </div>
                    <div class="product_popup_publish_area">
                        <div class="product_popup_text">유통사</div>
                        <input type="text" id="product_popup_publish" />
                    </div>
                    <div class="product_popup_picture_area">
                        <div class="product_popup_text">앨범사진</div>
                        <input type="file" id="product_popup_picture" />
                    </div>
                    <div class="product_popup_ox">
                        <button>입력하기</button>
                        <button>취소하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManagerSection;

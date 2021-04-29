import React from "react";
import "../style/manager_page.css";

const ManagerSection = () => {
    return (
        <div id="main">
            <div className="body_container">
                <div className="inner_body">
                    <ul className="body_menu">
                        <li className="menu_notice active">공지 관리</li>
                        <li className="menu_banner">배너 관리</li>
                        <li className="menu_product">상품 관리</li>
                        <li className="menu_qna">Q&A 관리</li>
                        <li className="menu_faq">FAQ 관리</li>
                    </ul>
                    <div className="notice_board board">
                        <div className="notice">
                            <div className="notice_idx">번호</div>
                            <div className="notice_title notice_title_top">
                                제목
                            </div>
                            <div className="notice_date">날짜</div>
                        </div>
                    </div>
                    <div className="banner_board board">
                        <div className="banner">
                            <div className="banner_idx">번호</div>
                            <div className="banner_title banner_title_top">
                                제목
                            </div>
                            <div className="banner_date">날짜</div>
                        </div>
                    </div>
                    <div className="product_board board">
                        <div className="product">
                            <div className="product_idx">번호</div>
                            <div className="product_singer">가수</div>
                            <div className="product_title">앨범명</div>
                            <div className="product_genre">장르</div>
                            <div className="product_release_date">발매일</div>
                            <div className="product_publish">유통사</div>
                        </div>
                    </div>
                    <div className="qna_board board">
                        <div className="qna">
                            <div className="qna_idx">번호</div>
                            <div className="qna_title qna_title_top">제목</div>
                            <div className="qna_date">날짜</div>
                        </div>
                    </div>
                    <div className="faq_board board">
                        <div className="faq">
                            <div className="faq_idx">번호</div>
                            <div className="faq_title faq_title_top">제목</div>
                            <div className="faq_date">날짜</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="insert_button">
                <div className="left"></div>
                <div className="right"></div>
            </div>
            <div className="popup_background"></div>
            <div className="notice_modify_popup">
                <form action="#" id="notice_modify_form">
                    <div className="notice_popup_title_area">
                        <div className="notice_popup_text">제목</div>
                        <input type="text" id="notice_popup_title" />
                    </div>
                    <div className="notice_popup_detail_area">
                        <div className="notice_popup_text">내용</div>
                        <textarea
                            name="notice_popup_detail"
                            id="notice_popup_detail"
                        ></textarea>
                    </div>
                    <div className="notice_popup_ox">
                        <button>입력하기</button>
                        <button>취소하기</button>
                    </div>
                </form>
            </div>
            <div className="qna_modify_popup">
                <form action="#" id="qna_modify_form">
                    <div className="qna_popup_title_area">
                        <div className="qna_popup_text">제목</div>
                        <input type="text" id="qna_popup_title" />
                    </div>
                    <div className="qna_popup_detail_area">
                        <div className="qna_popup_text">내용</div>
                        <textarea
                            name="qna_popup_detail"
                            id="qna_popup_detail"
                        ></textarea>
                    </div>
                    <div className="qna_popup_ox">
                        <button>입력하기</button>
                        <button>취소하기</button>
                    </div>
                </form>
            </div>
            <div className="faq_modify_popup">
                <form action="#" id="faq_modify_form">
                    <div className="faq_popup_title_area">
                        <div className="faq_popup_text">제목</div>
                        <input type="text" id="faq_popup_title" />
                    </div>
                    <div className="faq_popup_detail_area">
                        <div className="faq_popup_text">내용</div>
                        <textarea
                            name="faq_popup_detail"
                            id="faq_popup_detail"
                        ></textarea>
                    </div>
                    <div className="faq_popup_ox">
                        <button>입력하기</button>
                        <button>취소하기</button>
                    </div>
                </form>
            </div>
            <div className="banner_modify_popup">
                <form action="#" id="banner_modify_form">
                    <div className="banner_popup_title_area">
                        <div className="banner_popup_text">제목</div>
                        <input type="text" id="banner_popup_title" />
                    </div>
                    <div className="banner_popup_detail_area">
                        <div className="banner_popup_text">내용</div>
                        <textarea
                            name="banner_popup_detail"
                            id="banner_popup_detail"
                        ></textarea>
                    </div>
                    <div className="banner_popup_ox">
                        <button>입력하기</button>
                        <button>취소하기</button>
                    </div>
                </form>
            </div>
            <div className="product_modify_popup">
                <form action="#" id="product_modify_form">
                    <div className="product_popup_singer_area">
                        <div className="product_popup_text">가수</div>
                        <input type="text" id="product_popup_singer" />
                    </div>
                    <div className="product_popup_title_area">
                        <div className="product_popup_text">앨범명</div>
                        <input type="text" id="product_popup_title" />
                    </div>
                    <div className="product_popup_genre_area">
                        <div className="product_popup_text">장르</div>
                        <input type="text" id="product_popup_genre" />
                    </div>
                    <div className="product_popup_release_date_area">
                        <div className="product_popup_text">발매일</div>
                        <input type="text" id="product_popup_release_date" />
                    </div>
                    <div className="product_popup_publish_area">
                        <div className="product_popup_text">유통사</div>
                        <input type="text" id="product_popup_publish" />
                    </div>
                    <div className="product_popup_picture_area">
                        <div className="product_popup_text">앨범사진</div>
                        <input type="file" id="product_popup_picture" />
                    </div>
                    <div className="product_popup_ox">
                        <button>입력하기</button>
                        <button>취소하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManagerSection;

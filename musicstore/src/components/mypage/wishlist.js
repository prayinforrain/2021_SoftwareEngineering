import React from "react";

const Wishlist = () => {
    return (
        <div id="content_container">
            <h1>찜 목록</h1>
            <div id="wish_box">
                <div className="wish_line">
                    <div className="wish_check">
                        <input type="checkbox" name="wish_selectAll" />
                    </div>
                    <div className="wish_name">상품 이름</div>
                    <div className="wish_artist">아티스트명</div>
                    <div className="wish_publish">배급사</div>
                    <div className="wish_price">가격</div>
                </div>
                <div className="wish_line">
                    <div className="wish_check">
                        <input type="checkbox" name="wish_select" />
                    </div>
                    <div className="wish_name">앨범이름</div>
                    <div className="wish_artist">가수</div>
                    <div className="wish_publish">(주)빅배급맨</div>
                    <div className="wish_price">8000</div>
                </div>
                <div className="wish_line">
                    <div className="wish_check">
                        <input type="checkbox" name="wish_select" />
                    </div>
                    <div className="wish_name">다른 앨범 이름</div>
                    <div className="wish_artist">새 가수</div>
                    <div className="wish_publish">(주)빅배급맨</div>
                    <div className="wish_price">5000</div>
                </div>
            </div>
            <div className="wish_button">
                선택한 상품을: <button>삭제</button>
            </div>
        </div>
    );
};

export default Wishlist;

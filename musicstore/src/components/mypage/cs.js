import React from 'react';

const Cs = () => {
	return (
		<div id="content_container" className="member_info">
			<h1>문의 내역</h1>
			<div id="qna_box">
				<div className="qna_line">
					<div className="qna_no">번호</div>
					<div className="qna_title">문의 제목</div>
					<div className="qna_postedat">질문 일시</div>
					<div className="qna_answeredat">답변 일시</div>
					<div className="qna_status">문의 상태</div>
				</div>
				<div className="qna_line">
					<div className="qna_no">2</div>
					<div className="qna_title">아이너무궁금하당</div>
					<div className="qna_postedat">2021-04-14 17:02:08</div>
					<div className="qna_answeredat">-</div>
					<div className="qna_status">처리중</div>
				</div>
				<div className="qna_line">
					<div className="qna_no">1</div>
					<div className="qna_title">궁금해요ㅕ굼긍해빨리답변해주세요</div>
					<div className="qna_postedat">2021-04-13 09:24:31</div>
					<div className="qna_answeredat">2021-04-13 15:54:29</div>
					<div className="qna_status">답변 완료</div>
				</div>
			</div>
			<div id="qna_button">
				<button>문의하기</button>
			</div>
		</div>
	);
};

export default Cs;

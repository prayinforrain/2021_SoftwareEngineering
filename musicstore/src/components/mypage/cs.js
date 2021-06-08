import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import * as config from '../Config';
import InquiryRow from './InquiryRow';

const Cs = ({user}) => {
	const [inquiries, setInquiries] = useState([]);
	const Refs = useRef({}); // 0팝업전체, 1제목, 2내용
	const history = useHistory();

	const fetchInquiries = async () => {
		const userID = window.sessionStorage.uid;
		console.log(user);
		axios({
			method: 'POST',
			url: `${config.BACKEND_URL}/get_inquiry`,
			data: {
				userID,
			},
		}).then( res => {
			console.log(res);
			setInquiries(res.data);
		}).catch(err => {
			console.log(err);
		});
	}

	useEffect(() => {
		fetchInquiries();
	}, []);

	const newInquiry = () => {
		Refs.current[0].style.display = "flex";
	}

	const closeNewInquiry = () => {
		Refs.current[2].value = "";
		Refs.current[0].style.display = "none";
	}

	const submitNewInquiry = () => {
		if(Refs.current[1].value !== "" && Refs.current[2].value !== "") {
			axios({
                method: 'POST',
                url: `${config.BACKEND_URL}/new_inquiry`,
                data: {
                    productID: 0,
                    orderID : 0,
                    customerID: window.sessionStorage.uid,
                    title: Refs.current[1].value,
                    detail: Refs.current[2].value
                },
            }).then( res => {
                console.log(res);
                if(res.status === 200) {
                    alert("문의 등록이 완료되었습니다.")
                    history.go(0);
                } else {
                    alert("오류가 발생하였습니다.")
                }
            }).catch(err => {
                console.log(err);
                alert("오류가 발생하였습니다.")
            });
		} else {
			alert("문의 제목과 내용을 입력해주세요.");
		}
	}

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
				{inquiries.map(e => {
					return (<InquiryRow item={e} key={e.id}/>);
				})}
				{/*<div className="qna_line">
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
				</div>*/}
			</div>
			<div id="qna_button">
				<button onClick={newInquiry}>문의하기</button>
			</div>
			<div id="qna_new_popup" ref={e => Refs.current[0] = e}>
				<div className="qna_new">
					<div className="qna_new_title">
						<input className="qna_new_title_input"
						placeholder="문의 제목을 입력하세요."
						ref={e => Refs.current[1] = e}/>
					</div>
					<div className="qna_new_textarea">
						<textarea className="qna_new_input"
						placeholder="문의할 내용을 입력하세요."
						ref={e => Refs.current[2] = e}/>
					</div>
					<div className="qna_new_submit">
						<button onClick={submitNewInquiry}>submit</button><button onClick={closeNewInquiry}>Cancel</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cs;

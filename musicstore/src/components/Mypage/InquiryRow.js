import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {useHistory} from 'react-router-dom';
import * as config from '../Config';

const InquiryRow = ({item}) => {
    const history = useHistory();
    const [status, setStatus] = useState("");
    const Refs = useRef({});
    const [detailVisible, setDetailVisible] = useState(false);
    const [formVisible, setFormVisible] = useState(false);

    useEffect(() => {
        if(item.answer) {
            //답변이 있음
            setStatus("답변 완료");
        } else {
            setStatus("처리중");
        }
    }, [item]);
    
    const toggleHandler = () => {
        if(detailVisible === true) {
            Refs.current[0].style.display = "none";
            Refs.current[1].style.display = "none";
            setDetailVisible(false);
            setFormVisible(false);
        } else {
            Refs.current[0].style.display = "block";
            setDetailVisible(true);
        }
    }

    const toggleMoreInquiry = () => {
        if(formVisible === true) {
            Refs.current[1].style.display = "none";
            setFormVisible(false);
        } else {
            Refs.current[1].style.display = "flex";
            setFormVisible(true);
        }
    }

    const submitHandler = async() => {
        if(Refs.current[2].value !== "") {
            axios({
                method: 'POST',
                url: `${config.BACKEND_URL}/new_inquiry`,
                data: {
                    productID: item.productID,
                    orderID : item.orderID,
                    customerID: item.customerID,
                    title: "RE:" + item.title,
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
            alert("문의 내용을 입력해주세요.");
        }
    }

	return (
        <div className="qna_row">
            <div className="qna_line" onClick={toggleHandler}>
                <div className="qna_no">{item.id}</div>
                <div className="qna_title">{item.title}</div>
                <div className="qna_postedat">{item.createdAt}</div>
                <div className="qna_answeredat">{status === "답변 완료" ? (item.updatedAt) : ("-")}</div>
                <div className="qna_status">{status}</div>
            </div>
            <div className="qna_detail" ref={e => Refs.current[0] = e}>
                <div className="qna_detail_row">
                    <div className="qna_detail_row_header">
                        문의 내용
                    </div>
                    <div className="qna_detail_row_content">
                        {item.productID !== 0 && <>문의 상품 : {item.productID}<br/></>}
                        {item.orderID !== 0 && <>주문번호 : {item.orderID}<br/></>}
                        {item.detail}
                    </div>
                </div>
                {item.answer ? (
                    <div className="qna_detail_row">
                        <div className="qna_detail_row_header">
                            답변 내용
                        </div>
                        <div className="qna_detail_row_content">
                            {item.answer}
                            <div className="qna_detail_moreBtn">
                                <button onClick={toggleMoreInquiry}>추가문의</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="qna_detail_row">
                        <div className="qna_no_answer"/>
                    </div>
                )}
            </div>
            <div className="qna_more" ref={e => Refs.current[1] = e}>
                <div className="qna_more_textarea">
                    <textarea className="qna_more_input"
                    placeholder="추가 문의를 입력하세요."
                    ref={e => Refs.current[2] = e}/>
                </div>
                <div className="qna_more_submit">
                    <button onClick={submitHandler}>submit</button>
                </div>
            </div>
        </div>
	);
};

export default InquiryRow;

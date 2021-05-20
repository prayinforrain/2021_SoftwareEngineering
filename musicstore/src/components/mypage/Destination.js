import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../style/destination.css";

const Destination = ({ openDestinationEnrollModal }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios({
            method:"POST",
            url:"http://localhost:3001/destination",
            //로그인중인 사용자 ID의 데이터베이스상 id (user.id) 번호
            data:{
                id:1,
            }
        }).then(res => {
            //console.log(res.data);
            setItems(res.data);
        })
    }, [])


    return (
        <div id="content_container" className="destination_container">
            <div className="inner_container">
                <div className="title">배송지 관리</div>
                <div className="default_destination">
                    <div className="box_header">기본 배송지</div>
                    <div className="destination">
                        <div className="receiver">
                            <span className="bold">수령인</span>
                            <span className="name">손흥민</span>
                        </div>
                        <div className="receiver_destinaion">
                            <span className="bold">수령지</span>
                            <span className="address">asd</span>
                        </div>
                        <div className="contact">
                            <span className="bold">연락처</span>
                            <span className="receiver_contact">
                                010-5513-3452
                            </span>
                        </div>
                    </div>
                </div>
                <div className="destination_list">
                    <div className="box_header">배송지 목록</div>
                    <div className="list_container">
                        {items.map((i) => (
                            <div className = "destination">
                                <div className="receiver">
                                    <span className="bold">수령인</span>
                                    <span className="name">아맞다이름</span>
                                </div>
                                <div className="receiver_destinaion">
                                    <span className="bold">수령지</span>
                                    <span className="address">
                                        {i.jibunAddress1} {i.jibunAddress2}<br/>
                                        {i.postcode}
                                    </span>
                                </div>
                                <div className="contact">
                                    <span className="bold">연락처</span>
                                    <span className="receiver_contact">
                                        아맞다연락처
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div
                        className="insert_destination"
                        onClick={openDestinationEnrollModal}
                    >
                        배송지 추가
                    </div>
                </div>
                <div className="button_box">
                    <button>확인</button>
                    <button>취소</button>
                </div>
            </div>
        </div>
    );
};

export default Destination;

import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../style/destination.css";
import DestinationEnroll from "../DestinationEnroll";

const Destination = ({ user }) => {
    const [items, setItems] = useState([]);
    const [modalStatus, setModalStatus] = useState(0);
    const [editInfo, setEditInfo] = useState();
    
    
    useEffect(() => {
        if(modalStatus === 0) {
            fetchDestination();
        }
    }, [modalStatus, user]);

    const fetchDestination = async () => {
        axios({
            method:"POST",
            url:"http://localhost:3001/destination",
            //로그인중인 사용자 ID의 데이터베이스상 id (user.id) 번호
            data:{
                id:user.id,
            }
        }).then(res => {
            setItems(res.data);
        })
    }

    useEffect(() => {
        console.log("아");
        fetchDestination();
    }, []);

    

    const modalClick = () => {
        if(modalStatus === 1) setModalStatus(0);
        else setModalStatus(1);
    }

    const editHandler = (e, key) => {
        if(modalStatus === 0) {
            setEditInfo(items[key-1]);
            setModalStatus(2);
        }
        else setModalStatus(0);
    }

    return (
        <>
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
                                <div className = "destination" key={i.id} onClick={(e) => editHandler(e, i.id)}>
                                    <div className="receiver">
                                        <span className="bold">수령인</span>
                                        <span className="name">{i.customerName}</span>
                                    </div>
                                    <div className="receiver_destinaion">
                                        <span className="bold">수령지</span>
                                        <span className="address">
                                            {i.postcode}<br/>
                                            {i.jibunAddress1} {i.jibunAddress2} {i.extraAddress}<br/>
                                        </span>
                                    </div>
                                    <div className="contact">
                                        <span className="bold">연락처</span>
                                        <span className="receiver_contact">
                                            {i.customerContact}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div
                            className="insert_destination"
                            onClick={modalClick}
                        >
                            배송지 추가
                        </div>
                    </div>
                </div>
            </div>
            {modalStatus === 1 ? (<DestinationEnroll user={user} setModalStatus = {setModalStatus}/>) : (<></>)}
            {modalStatus === 2 ? (<DestinationEnroll user={user} setModalStatus = {setModalStatus} editInfo={editInfo}/>) : (<></>)}
        </>
    );
};

export default Destination;

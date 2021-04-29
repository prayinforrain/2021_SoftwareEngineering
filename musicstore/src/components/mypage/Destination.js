import React from "react";
import "../../style/destination.css";

const Destination = ({ openDestinationEnrollModal }) => {
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
                        <div className="destination">
                            <div className="receiver">
                                <span className="bold">수령인</span>
                                <span className="name">손흥민</span>
                            </div>
                            <div className="receiver_destinaion">
                                <span className="bold">수령지</span>
                                <span className="address">
                                    서울시 송파구 잠실동 장미아파트
                                </span>
                            </div>
                            <div className="contact">
                                <span className="bold">연락처</span>
                                <span className="receiver_contact">
                                    010-5513-3452
                                </span>
                            </div>
                        </div>
                        <div className="destination">
                            <div className="receiver">
                                <span className="bold">수령인</span>
                                <span className="name">오윤환</span>
                            </div>
                            <div className="receiver_destinaion">
                                <span className="bold">수령지</span>
                                <span className="address">
                                    서울시 송파구 잠실동 장미아파트
                                </span>
                            </div>
                            <div className="contact">
                                <span className="bold">연락처</span>
                                <span className="receiver_contact">
                                    010-2413-4412
                                </span>
                            </div>
                        </div>
                        <div className="destination">
                            <div className="receiver">
                                <span className="bold">수령인</span>
                                <span className="name">이우재</span>
                            </div>
                            <div className="receiver_destinaion">
                                <span className="bold">수령지</span>
                                <span className="address">
                                    서울시 송파구 잠실동 장미아파트
                                </span>
                            </div>
                            <div className="contact">
                                <span className="bold">연락처</span>
                                <span className="receiver_contact">
                                    010-@@@@-####
                                </span>
                            </div>
                        </div>
                        <div className="destination">
                            <div className="receiver">
                                <span className="bold">수령인</span>
                                <span className="name">전윤철</span>
                            </div>
                            <div className="receiver_destinaion">
                                <span className="bold">수령지</span>
                                <span className="address">
                                    서울시 송파구 잠실동 장미아파트
                                </span>
                            </div>
                            <div className="contact">
                                <span className="bold">연락처</span>
                                <span className="receiver_contact">
                                    010-7251-2411
                                </span>
                            </div>
                        </div>
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

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../../style/destination.css';
import DestinationEnroll from '../DestinationEnroll';
import * as config from '../Config';

const Destination = ({ user, setUser }) => {
	const userID = window.sessionStorage.id;
	const [items, setItems] = useState([]);
	const [defaultDestination, setDefaultDestination] = useState([]);
	const [modalStatus, setModalStatus] = useState(false);
	const [editInfo, setEditInfo] = useState(false);

	useEffect(() => {
		console.log(user);
		axios.post(`${config.BACKEND_URL}/destination`, { userID }).then(res => {
			console.log(res.data);
			setItems(res.data);
			if (user.defaultDestination) {
				setDefaultDestination(res.data.filter(el => user.defaultDestination === el.id)[0]);
			}
		});
	}, [modalStatus, user]);

	const modalClick = () => {
		setModalStatus(true);
		setEditInfo(false);
	};

	const editHandler = (e, id) => {
		setModalStatus(true);
		setEditInfo(id);
	};

	return (
		<>
			<div id="content_container" className="destination_container">
				<div className="inner_container">
					<div className="title">배송지 관리</div>
					<div className="below_title">기본 배송지</div>
					{user.defaultDestination ? (
						<div className="destination" key={defaultDestination.id}>
							<div className="receiver">
								<span className="bold">수령인</span>
								<span className="name">{defaultDestination.customerName}</span>
							</div>
							<div className="receiver_destinaion">
								<span className="bold">우편번호</span>
								<span className="address">{defaultDestination.postcode}</span>
							</div>
							<div className="receiver_destination">
								<span className="bold">수령지</span>
								<span className="address">
									{defaultDestination.jibunAddress1} {defaultDestination.jibunAddress2} {defaultDestination.extraAddress}
								</span>
							</div>
							<div className="contact">
								<span className="bold">연락처</span>
								<span className="receiver_contact">{defaultDestination.customerContact}</span>
							</div>
						</div>
					) : (
						<div>기본 배송지가 없습니다. 등록해주세요</div>
					)}
					<div className="default_destination"></div>
					<div className="destination_list">
						<div className="box_header">배송지 목록</div>
						<div className="list_container">
							{items.map(i => (
								<div className="destination" key={i.id} onClick={e => editHandler(e, i.id)}>
									<div className="receiver">
										<span className="bold">수령인</span>
										<span className="name">{i.customerName}</span>
									</div>
									<div className="receiver_destinaion">
										<span className="bold">우편번호</span>
										<span className="address">{i.postcode}</span>
									</div>
									<div className="receiver_destination">
										<span className="bold">수령지</span>
										<span className="address">
											{i.jibunAddress1} {i.jibunAddress2} {i.extraAddress}
										</span>
									</div>
									<div className="contact">
										<span className="bold">연락처</span>
										<span className="receiver_contact">{i.customerContact}</span>
									</div>
								</div>
							))}
						</div>
						<div className="insert_destination" onClick={modalClick}>
							배송지 추가
						</div>
					</div>
				</div>
			</div>
			{modalStatus && (
				<DestinationEnroll setUser={setUser} user={user} setModalStatus={setModalStatus} info={editInfo} setInfo={setEditInfo} />
			)}
		</>
	);
};

export default Destination;

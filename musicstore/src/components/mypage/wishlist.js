import axios from 'axios';
import React, { useEffect, useState } from 'react';
import * as config from '../Config.js';

const Wishlist = () => {
	const userID = window.sessionStorage.id;
	const [wishlists, setWishlists] = useState([]);
	const [checked, setChecked] = useState([]);
	const onChange = (e, id) => {
		if (e.checked) {
			setChecked([...checked, id]);
		} else {
			setChecked(checked.filter(el => el !== id));
		}
	};

	const checkAll = e => {
		console.log(e);
		if (!e.target.checked) {
			setChecked([]);
			document.querySelectorAll('.wish_checkbox').forEach(el => (el.checked = false));
		} else {
			setChecked(wishlists.map(el => el.id));
			document.querySelectorAll('.wish_checkbox').forEach(el => (el.checked = true));
		}
	};
	useEffect(() => {
		axios.post(`${config.BACKEND_URL}/getwishlist`, { userID }).then(res => {
			console.log(res.data);
			setWishlists(res.data);
		});
	}, []);

	const onDelete = () => {
		document.querySelector('.top_checkbox').checked = false;
		axios.post(`${config.BACKEND_URL}/delete_wishlist`, { list: checked, userID }).then(res => {
			console.log(res.data);
			setWishlists(res.data);
		});
	};

	return (
		<div id="content_container" className="member_info">
			<h1>찜 목록</h1>
			{wishlists.length !== 0 ? (
				<div>
					<div id="wish_box">
						<div className="wish_line">
							<div className="wish_check">
								<input className="top_checkbox" type="checkbox" name="wish_selectAll" onChange={checkAll} />
							</div>
							<div className="wish_name">상품 이름</div>
							<div className="wish_artist">아티스트명</div>
							<div className="wish_publish">배급사</div>
							<div className="wish_price">가격</div>
						</div>
						{wishlists.map(wishlist => (
							<div className="wish_line" key={wishlist.id}>
								<div className="wish_check">
									<input
										className="wish_checkbox"
										type="checkbox"
										name="wish_select"
										onChange={e => {
											onChange(e.target, wishlist.id);
										}}
									/>
								</div>
								<div className="wish_name">{wishlist.item.album}</div>
								<div className="wish_artist">{wishlist.item.singer}</div>
								<div className="wish_publish">{wishlist.item.supply}</div>
								<div className="wish_price">{wishlist.item.price}</div>
							</div>
						))}
					</div>
					<div className="wish_button">
						선택한 상품을: <button onClick={onDelete}>삭제</button>
					</div>
				</div>
			) : (
				<div>찜 목록이 비어있습니다</div>
			)}
		</div>
	);
};

export default Wishlist;

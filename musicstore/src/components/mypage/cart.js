import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as config from '../Config';

const Cart = () => {
	/*
    ItemInfo의 상품 정보 DB 구조에 갯수인 count가 추가되었음
    */
	const [totalPrice, setTotalPrice] = useState(0);
	const [cart, setCart] = useState([]);

	const [checkItems, setCheckItems] = useState([]);
	const userID = window.sessionStorage.id;
	const fetchCart = async () => {
		/*const res = await axios.get('http://localhost:3001/getcart/', {
            userID: user.id
        });*/
		axios({
			method: 'POST',
			url: `${config.BACKEND_URL}/getcart/`,
			data: {
				userID,
			},
		})
			.then(res => {
				console.log(res.data);
				setCart(res.data);
				// axios.post(`${config.BACKEND_URL}/getItems`, { list }).then(res => {
				// 	setCheckItems(res.data);
				// 	console.log(res.data);
				// });
			})
			.catch(err => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchCart();
		setGlobalPrice(cart);
	}, [checkItems, totalPrice]);

	const onChange = async (e, id) => {
		const {
			target: { name, value },
		} = e;
		//console.log(id, " ", Number(value));
		if (name === 'product_count') {
			const changeItem = cart.filter(i => i.id === id);
			// setCart(cart.map(i => (i.id === id ? { ...i, quantity: value } : i)));
			axios({
				method: 'POST',
				url: `${config.BACKEND_URL}/editcart/`,
				data: {
					quantity: value,
					cartID: changeItem[0].id,
					userID,
				},
			}).then(res => {
				setCart(res.data);
				setGlobalPrice(res.data);
			});
		}
	};

	const checkHandler = (checked, id) => {
		if (checked) {
			setCheckItems([...checkItems, id]);
			setGlobalPrice(cart);
		} else {
			setCheckItems(checkItems.filter(e => e !== id));
			setGlobalPrice(cart);
		}
	};

	const onCheckAll = checked => {
		if (checked) {
			setCheckItems(cart.map(el => el.itemID));
		} else {
			setCheckItems([]);
		}
	};

	const setGlobalPrice = data => {
		let total = 0;
		data.map(item => {
			if (checkItems.includes(item.itemID)) {
				total += item.quantity * item.item.price;
			}
		});
		setTotalPrice(total);
	};

	const handleDelete = () => {
		if (checkItems.length !== 0) {
			axios.post(`${config.BACKEND_URL}/deletecart`, { list: checkItems, userID }).then(res => {
				setCart(res.data);
				alert(`상품 ${checkItems.length}개가 삭제 되었습니다.`);
				setCheckItems([]);
			});
		} else {
			alert('삭제할 상품을 선택해주세요!');
		}

		// for (var n = 0; n < checkItems.length; n++) {
		// 	console.log(checkItems[n]);
		// 	await axios({
		// 		method: 'POST',
		// 		url: `${config.BACKEND_URL}/deletecart/`,
		// 		data: {
		// 			cartID: checkItems[n],
		// 		},
		// 	});
		// }
		// setCheckItems([]);
		// fetchCart();
		// alert('삭제되었습니다.');
	};

	return (
		<div id="content_container" className="member_info">
			<h1>장바구니</h1>
			<div id="cart_box">
				<div className="cart_line">
					<div className="cart_check">
						<input type="checkbox" name="cart_selectAll" onChange={e => onCheckAll(e.target.checked)} />
					</div>
					<div className="cart_name">상품 이름</div>
					<div className="cart_artist">아티스트명</div>
					<div className="cart_publish">배급사</div>
					<div className="cart_count">수량</div>
					<div className="cart_price">가격</div>
				</div>
				{cart.map(i => (
					<div className="cart_line" key={i.id}>
						<div className="cart_check">
							<input
								type="checkbox"
								name="cart_select"
								onChange={e => checkHandler(e.target.checked, i.itemID)}
								checked={checkItems.indexOf(i.itemID) >= 0 ? true : false}
							/>
						</div>
						<div className="cart_name">{i.item.album}</div>
						<div className="cart_artist">{i.item.singer}</div>
						<div className="cart_publish">{i.item.supply}</div>
						<div className="cart_count">
							<input type="number" name="product_count" value={i.quantity} onChange={e => onChange(e, i.id)} />
						</div>
						<div className="cart_price">{i.item.price}</div>
					</div>
				))}
			</div>
			<div id="cart_box_footer">
				<div id="cart_total">
					총 : <span id="cart_total_price">{totalPrice}</span>원
				</div>
				<div className="cart_button">
					선택한 상품을: <button>구매</button>
					<button onClick={handleDelete}>삭제</button>
				</div>
			</div>
		</div>
	);
};

export default Cart;

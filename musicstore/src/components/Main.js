import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Notice from './Notice';
import Qna from './Qna';
import Item_Mainpage from './Item_Mainpage';

const Main = () => {
	const [banner, setBanner] = useState('');
	const [banners, setBanners] = useState('');
	const [items, setItems] = useState('');

	const bannerAutoChange = banners => {
		let count = 1;
		setInterval(() => {
			setBanner(`http://localhost:3001/${banners[count % 5]}`);
			count++;
		}, 30000);
	};
	useEffect(() => {
		axios
			.get('http://localhost:3001/main_contents')
			.then(res => {
				const data = JSON.parse(res.data);
				console.log(data);
				setBanner(`http://localhost:3001/${data.bannerInfo[0]}`);
				setBanners(data.bannerInfo);
				setItems(data.itemInfo);
				bannerAutoChange(data.bannerInfo);
			})
			.catch(err => {
				console.log('in main');
				console.error(err);
			});
	}, []);
	return (
		<div id="main">
			<div id="main_container">
				<div className="menu">
					<ul>
						<li valign="top">
							<a className="active" href="#home">
								menu
							</a>
						</li>
						<li>
							<a href="#menu1">menu1</a>
						</li>
						<li>
							<a href="#menu2">menu2</a>
						</li>
					</ul>
				</div>
				<div id="content_container">
					<div className="upper_container">
						{banners === '' ? (
							<div>로딩중</div>
						) : (
							<div className="banner_container">
								<img src={banner} id="event_banner" alt="배너" />
							</div>
						)}
						<div className="upper_right_container">
							<Notice />
							<Qna />
						</div>
					</div>
					<div id="product_container">{items ? items.map(item => <Item_Mainpage data={item} />) : ''}</div>
				</div>
			</div>
		</div>
	);
};

export default Main;

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Notice from './Notice';
import Qna from './Qna';
import Item_Mainpage from './Item_Mainpage';
import * as config from './Config';
import Menu from './Menu';

const Main = () => {
	const [banner, setBanner] = useState('');
	const [banners, setBanners] = useState('');
	const [items, setItems] = useState('');

	const bannerAutoChange = banners => {
		let count = 1;
		setInterval(() => {
			setBanner(`${config.BACKEND_URL}/${banners[count % 5]}`);
			count++;
		}, 30000);
	};
	useEffect(() => {
		axios
			.get(`${config.BACKEND_URL}/main_contents`)
			.then(res => {
				const data = JSON.parse(res.data);
				console.log(data);
				setBanner(`${config.BACKEND_URL}/${data.bannerInfo[0]}`);
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
				<Menu/>
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
					<div id="product_container">{items ? items.map(item => <Item_Mainpage key={item.id} data={item} />) : ''}</div>
				</div>
			</div>
		</div>
	);
};

export default Main;

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Notice from './Notice';
import Qna from './Qna';

const Main = () => {
	const [banner, setBanner] = useState('');
	const [banners, setBanners] = useState('');
	useEffect(() => {
		axios
			.get('http://localhost:3001/bannerImage')
			.then(res => {
				console.log(res.data);
				setBanners(res.data);
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
						{banners === '' ? <div>로딩중</div> : <img src={`data:image/png;base64,${banners[1]}`} id="event_banner" />}
						<div className="upper_right_container">
							<Notice />
							<Qna />
						</div>
					</div>
					<div id="product_container">
						<div className="dummy_product"></div>
						<div className="dummy_product"></div>
						<div className="dummy_product"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;

import React from 'react';
import img01 from '../img/01.jpg';
import Notice from './Notice';
import Banner from './Banner';
import Qna from './Qna';

const Main = () => {
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
					<div id="event_banner">
						<img
							src={img01}
							id="main_image"
							alt="main"
							style={{
								width: '500px',
								height: '500px',
							}}
						/>
					</div>
					<div id="info">
						<Notice />
						<Banner />
						<Qna />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;

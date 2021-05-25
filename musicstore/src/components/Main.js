import React from 'react';
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
					<div className="upper_container">
						<div id="event_banner"></div>
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

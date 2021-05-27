import axios from 'axios';
import { useState, useEffect } from 'react';
import * as config from './Config';

const Banner = () => {
	const [banner, setBanner] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		axios
			.get(`${config.BACKEND_URL}/bannerImage`)
			.then(res => setBanner(res.data.reverse().slice(0, 5)))
			.then(() => {
				setLoading(false);
			})
			.catch(err => {
				console.error(err);
			});
	}, []);
	if (loading) {
		return <div>로딩중</div>;
	}
	if (!banner) {
		return <div>아직 로딩중</div>;
	} else {
		return (
			<div id="banner" className="main_manage">
				{banner.map(el => {
					return (
						<div key={el.id} className="banner">
							{el.title}
						</div>
					);
				})}
			</div>
		);
	}
};

export default Banner;

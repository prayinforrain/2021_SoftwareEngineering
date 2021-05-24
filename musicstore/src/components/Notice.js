import axios from 'axios';
import { useState, useEffect } from 'react';

const Notice = () => {
	const [notice, setNotice] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		axios
			.get('http://localhost:3001/notice')
			.then(res => setNotice(res.data.reverse().slice(0, 5)))
			.then(() => {
				setLoading(false);
			})
			.catch(err => {
				console.error(err);
			});
	}, []);
	console.log(notice);
	if (loading) {
		return <div>로딩중</div>;
	}
	if (!notice) {
		return <div>아직 로딩중</div>;
	} else {
		return (
			<div id="notice" className="main_manage">
				{notice.map(el => {
					return <div className="notice">{el.title}</div>;
				})}
			</div>
		);
	}
};

export default Notice;

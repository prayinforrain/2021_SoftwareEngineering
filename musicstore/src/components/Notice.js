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
		return () => {
			setLoading(false);
		};
	}, []);
	if (loading) {
		return <div>로딩중</div>;
	}
	if (!notice) {
		return <div>아직 로딩중</div>;
	} else {
		return (
			<div id="notice" className="main_manage">
				<h3>공지사항</h3>
				<div className="notice_container">
					{notice.map((el, idx) => {
						return (
							<div key={idx} className="notice">
								{el.title}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
};

export default Notice;

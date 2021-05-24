import axios from 'axios';
import { useState, useEffect } from 'react';

const Qna = () => {
	const [qna, setQna] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		axios
			.get('http://localhost:3001/qna')
			.then(res => setQna(res.data.reverse().slice(0, 5)))
			.then(() => {
				setLoading(false);
			})
			.catch(err => {
				console.error(err);
			});
	}, []);
	console.log(qna);
	if (loading) {
		return <div>로딩중</div>;
	}
	if (!qna) {
		return <div>아직 로딩중</div>;
	} else {
		return (
			<div id="qna" className="main_manage">
				{qna.map(el => {
					return <div className="qna">{el.title}</div>;
				})}
			</div>
		);
	}
};

export default Qna;

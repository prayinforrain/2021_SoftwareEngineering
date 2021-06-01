import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as config from './Config';
import ProductPost from './Manage/ProductPost';
import Menu from './Menu';
import '../style/common.css';
import { urlencoded } from 'body-parser';

const GenreSearch = ({ openItemModal, closeItemModal }) => {
	const genre = useParams().genre;
	const translate = {
		ballad: '발라드',
		dance: '댄스',
		rap: '랩 / 힙합',
		rnb: 'R&B / Soul',
		indi: '인디',
		rock: '록 / 메탈',
		trot: '트로트',
		fork: '포크 / 블루스',
	};
	const [genreValue, setGenreValue] = useState();
	const [items, setItems] = useState();
	useEffect(() => {
		axios.get(`${config.BACKEND_URL}/get_items/${genre}`).then(res => {
			console.log(genre);
			setItems(res.data);
		});
	}, [genre]);
	console.log(items);
	return (
		<div id="main">
			<div id="main_container">
				<Menu />
				<div id="content_container">
					<h1>{translate[genre]} 검색 결과</h1>
					<hr />
					<div id="result_container" style={{ border: '5px dotted red' }}>
						{items ? (
							items.map(item => (
								<div
									className="item"
									key={item.id}
									style={{ backgroundImage: `url(${config.BACKEND_URL}/${item.cover.split('\\').join('/')})` }}
									onClick={() => {
										openItemModal(item);
										console.log('hi');
									}}
								>
									<div className="inner_item">
										<span>앨범 : </span>
										<span>{item.album}</span>
									</div>
									<div className="inner_item">
										<span>가수 : </span>
										<span>{item.singer}</span>
									</div>
									<div className="inner_item">
										<span>배급사 :</span>
										<span>{item.supply}</span>
									</div>
									<div className="inner_item">
										<span>발매일 : </span>
										<span>{item.released}</span>
									</div>
								</div>
							))
						) : (
							<div>로딩중</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default GenreSearch;

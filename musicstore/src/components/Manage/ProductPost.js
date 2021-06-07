import { useState, useEffect } from 'react';
import axios from 'axios';
import * as config from '../Config';

const ProductPost = ({ data }) => {
	const [genres, setGenres] = useState([]);

	const fetchGenre = async () => {
		axios({
			method: 'POST',
			url: `${config.BACKEND_URL}/getgenres`,
			data: {
				itemID: data.id,
			},
		})
			.then(res => {
				setGenres(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};
	useEffect(() => {
		fetchGenre();
	}, [data]);
	return (
		<>
			<div className="product_idx">{data.id}</div>
			<div className="product_singer">{data.singer}</div>
			<div className="product_title">{data.album}</div>
			<div className="product_genre">
				{genres.map(e => (
					<>{e.name}, </>
				))}
			</div>
			<div className="product_release_date">{data.released}</div>
			<div className="product_publish">{data.supply}</div>
		</>
	);
};

export default ProductPost;

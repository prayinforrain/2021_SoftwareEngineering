import { useState, useEffect } from 'react';
import axios from 'axios';
import * as config from './Config';

const SearchPost = ({ data }) => {
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
			<div className="searchres_singer">{data.singer}</div>
			<div className="searchres_title">{data.album}</div>
			<div className="searchres_genre">
				{genres.map(e => (
					<>{e.name}, </>
				))}
			</div>
			<div className="searchres_release_date">{data.released}</div>
			<div className="searchres_publish">{data.supply}</div>
            <div className="searchres_price">{data.price}</div>
		</>
	);
};

export default SearchPost;

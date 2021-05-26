import { useState, useEffect } from 'react';
import axios from 'axios';


const ProductPost = ({ data }) => {
    const [genres, setGenres] = useState([]);

    const fetchGenre = async() => {
        axios({
            method:"POST",
            url:"http://localhost:3001/getgenres",
            data: {
                itemID : data.id
            }
        }).then(res => {
            setGenres(res.data);
            console.log(data.id + "번 아이템 장르 정보");
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }
    useEffect(() => {
        fetchGenre();
    }, [data])
	return (
		<>
            <div className="product_idx">{data.id}</div>
            <div className="product_singer">{data.singer}</div>
            <div className="product_title">{data.album}</div>
            <div className="product_genre">{genres.map((e) => (<>{e.name}, </>))}</div>
            <div className="product_release_date"></div>
            <div className="product_publish">{data.supply}</div>
        </>
	);
};

export default ProductPost;
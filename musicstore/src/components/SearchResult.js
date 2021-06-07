import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useHistory, useParams} from "react-router-dom"
import * as config from './Config';
import Menu from './Menu';
import '../style/common.css';
import SearchPost from './SearchPost';

const SearchResult = (  ) => {
    const params = useParams();
    const history = useHistory();
    const [resultData, setResultData] = useState([]);
    const [SearchOption, setSearchOption] = useState("0");
    const [Keyword, setKeyword] = useState("");

    const doSearch = (searchOrder) => {
        console.log("검색을 실행하였음");
        if(!searchOrder) {
            axios({
                method: 'POST',
                url: `${config.BACKEND_URL}/search`,
                data: {
                    keyword: Keyword,
                    searchOption: SearchOption
                }
            }).then(res => {
                console.log(res);
                setResultData(res.data);
            });
        } else {
            console.log(searchOrder + "의 옵션 적용");
            axios({
                method: 'POST',
                url: `${config.BACKEND_URL}/search`,
                data: {
                    keyword: Keyword,
                    searchOption: SearchOption,
                    searchOrder: order,
                    minPrice: minPrice,
                    maxPrice: maxPrice
                }
            }).then(res => {
                console.log(res);
                setResultData(res.data);
            });
        }
    }

	useEffect(() => {
        setSearchOption(params.SearchOption);
        setKeyword(params.Keyword);
	}, [params]);

    const onItemClick = (e, id) => {
        history.push('/iteminfo/' + id);
    }

    const [order, setOrder] = useState("0");
    const changeOrder = (e) => {
        const {
			target: { value },
		} = e;
        setOrder(value);
    }

    const [minPrice, setMinPirce] = useState(-1);
    const [maxPrice, setMaxPrice] = useState(-1);

    useEffect(() => {
        if(Keyword !== "") {
            doSearch(order);
        }
    }, [Keyword, order, minPrice, maxPrice])

    const useMinPrice = () => {
        setMinPirce(Number(document.getElementsByName("price_min")[0].value));
    }
    const useMaxPrice = () => {
        setMaxPrice(Number(document.getElementsByName("price_max")[0].value));
    }

	return (
		<div id="main">
			<div id="main_container">
				<Menu/>
				<div id="content_container">
                    <h1>검색 결과</h1>
                    <hr/>
                    <div id="result_container">
                        {resultData.length !== 0 ? (
                            <>
                            {SearchOption === "0" ? (
                                <div className="result_section">
                                    <div id="search_filter">
                                        <div id="search_order">
                                            <label htmlFor="order">검색순서 </label>
                                            <label>
                                                <input type="radio" name="order"
                                                value="0" onChange={changeOrder} defaultChecked
                                                />기본
                                            </label>
                                            <label>
                                                <input type="radio" name="order"
                                                value="1" onChange={changeOrder}
                                                />가격 낮은순
                                            </label>
                                            <label>
                                                <input type="radio" name="order"
                                                value="2" onChange={changeOrder}
                                                />가격 높은순
                                            </label>
                                        </div>
                                        <div id="price_filter">
                                            <div className="price_filter_row">
                                                최소 가격: <input type="number" name="price_min" defaultValue="0"/>
                                                <button onClick={useMinPrice}>적용</button>
                                            </div>
                                            <div className="price_filter_row">
                                                최대 가격: <input type="number" name="price_max" defaultValue="0"/>
                                                <button onClick={useMaxPrice}>적용</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="searchres_row" id="searchres_header">
                                        <div className="searchres_singer">아티스트</div>
                                        <div className="searchres_title">앨범명</div>
                                        <div className="searchres_genre">장르</div>
                                        <div className="searchres_release_date">출시일</div>
                                        <div className="searchres_publish">유통사</div>
                                        <div className="searchres_price">가격</div>
                                    </div>
                                    {resultData.map(i => {
                                        return (
                                            <div className="searchres_row" key={i.id} onClick={e => onItemClick(e, i.id)}>
                                                <SearchPost data = {i}/>
                                            </div> 
                                        )
                                    })}
                                </div>
                            )
                            : (
                                <div className="result_section">
                                    <div id="search_filter">
                                        <div id="search_order">
                                            <label htmlFor="order">검색순서 </label>
                                            <label>
                                                <input type="radio" name="order"
                                                value="0" onChange={changeOrder} defaultChecked
                                                />기본
                                            </label>
                                            <label>
                                                <input type="radio" name="order"
                                                value="1" onChange={changeOrder}
                                                />가격 낮은순
                                            </label>
                                            <label>
                                                <input type="radio" name="order"
                                                value="2" onChange={changeOrder}
                                                />가격 높은순
                                            </label>
                                        </div>
                                        <div id="price_filter">
                                            <div className="price_filter_row">
                                                최소 가격: <input type="number" name="price_min" defaultValue="0"/>
                                                <button onClick={useMinPrice}>적용</button>
                                            </div>
                                            <div className="price_filter_row">
                                                최대 가격: <input type="number" name="price_max" defaultValue="0"/>
                                                <button onClick={useMaxPrice}>적용</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="searchres_row" id="searchres_header">
                                        <div className="searchres_singer">아티스트</div>
                                        <div className="searchres_title">앨범명</div>
                                        <div className="searchres_genre">장르</div>
                                        <div className="searchres_release_date">출시일</div>
                                        <div className="searchres_publish">유통사</div>
                                        <div className="searchres_price">가격</div>
                                    </div>
                                    {resultData.map(i => {
                                        return (
                                            <div className="searchres_row" key={i.id} onClick={e => onItemClick(e, i.id)}>
                                                <SearchPost data = {i}/>
                                            </div> 
                                        )
                                    })}
                                </div>
                            )}
                            </>
                        ) : (
                            <>
                            검색어를 제대로 입력해주세요.
                            </>
                        )}
                    </div>
				</div>
			</div>
		</div>
	);
};

export default SearchResult;

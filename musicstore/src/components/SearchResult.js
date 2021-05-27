import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useHistory, useParams} from "react-router-dom"
import * as config from './Config';
import ProductPost from './Manage/ProductPost';
import Menu from './Menu';
import '../style/common.css';

const SearchResult = (  ) => {
    const params = useParams();
    const history = useHistory();
    const optionID = [0, 1, 2, 3];
    const optionHeader = ["제목", "가수", "배급사", "장르"];
    const [resultData, setResultData] = useState([]);
    const [SearchOption, setSearchOption] = useState("0");
    const [Keyword, setKeyword] = useState("");

    const doSearch = () => {
        console.log("검색을 실행하였음");
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
        })
    }

	useEffect(() => {
        setSearchOption(params.SearchOption);
        setKeyword(params.Keyword);
	}, []);

    useEffect(() => {
        if(Keyword !== "") {
            doSearch();
        }
    }, [Keyword])

    const onItemClick = (e, id) => {
        history.push('/iteminfo/' + id);
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
                                <>
                                <div className="result_section">
                                    <h2>제목 검색 결과</h2>
                                    {resultData[0].map(i => {
                                        console.log(i);
                                        return (
                                            <div className="inner_board" key={i.id} onClick={e => onItemClick(e, i.id)}>
                                                <ProductPost data = {i}/>
                                            </div> 
                                        )
                                    })}
                                </div>
                                <div className="result_section">
                                    <h2>가수 검색 결과</h2>
                                    {resultData[1].map(i => {
                                        return (
                                            <div className="inner_board" key={i.id}>
                                                <ProductPost data = {i}/>
                                            </div> 
                                        )
                                    })}
                                </div>
                                <div className="result_section">
                                    <h2>배급사 검색 결과</h2>
                                    {resultData[2].map(i => {
                                        return (
                                            <div className="inner_board" key={i.id}>
                                                <ProductPost data = {i}/>
                                            </div> 
                                        )
                                    })}
                                </div>
                                <div className="result_section">
                                    <h2>장르 검색 결과</h2>
                                    {resultData[3].map(i => {
                                        return (
                                            <div className="inner_board" key={i.id}>
                                                <ProductPost data = {i}/>
                                            </div> 
                                        )
                                    })}
                                </div>
                                </>
                            )
                            : (
                                <div className="result_section">
                                    <h2>{optionHeader[SearchOption-1]} 검f색 결과</h2>
                                    <hr/>
                                    {resultData.map(i => {
                                    return (
                                        <div className="inner_board" key={i.id}>
                                            <ProductPost data = {i}/>
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

import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import '../../style/add_item.css';


const Additem = () => {
    const [attach, setAttach] = useState();
    const [checkItems, setCheckItems] = useState([]);
    const [genres, setGenres] = useState([]);
    //장르 1발라드 2댄스 3랩힙합 4R&B/Soul 5인디 6록메탈 7트로트 8포크블루스

    const checkHandler = (checked, id) => {
        if(checked) {
            setCheckItems([...checkItems, id]);
        } else {
            setCheckItems(checkItems.filter(e=>e!==id));
        }
        console.log(checkItems);
    }

    const fetchGenres = async() => {
        const res = await axios.get('http://localhost:3001/getgenres/', {});
        setGenres(res.data);
    }

    useEffect(() => {
        fetchGenres();
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        const form = document.getElementById("add_item_form");
        const {
            album,
            singer,
            supply,
            price,
            detail,
            cover,
        } = form;
        const fileForm = new FormData();
        fileForm.append('cover', cover.files[0]);
        axios.post('http://localhost:3001/upload', fileForm, {
            headers : {
                'Content-Type': 'multipart/form-data'
            }
        }).then((coverPath) => {
            console.log("자르기 전");
            console.log(coverPath.data);
            const splitPath = coverPath.data.split("\\");
            console.log(splitPath);
            const realPath = splitPath[1] + "\\" + splitPath[2];
            console.log(realPath);
            axios({
                method: "POST",
                url: "http://localhost:3001/additem",
                data: {
                    album: album.value,
                    singer: singer.value,
                    supply: supply.value,
                    price: parseInt(price.value),
                    detail: detail.value,
                    cover: realPath,
                    genre: checkItems
                }
            }).then((res) => {
                console.log(res);
                alert('성공')
            }).catch(err=>{
                console.log("err occured while additem : ");
                console.log(err);
                alert("Error occured");
                return;
            })
        }).catch(err=>{
            console.log("err occured while upload : " + err);
            alert("Error occured");
            return;
        });
    }

    const onFileChange = (e) => {
        const {
            target: {files},
        } = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finished) => {
            const {
                currentTarget: {result},
            } = finished;
            setAttach(result);
        }
        if(theFile) {
            reader.readAsDataURL(theFile);
        }
    }

    return (
        <div >
            <form action="http://localhost:3001/upload" method="post" id="add_item_form" enctype="multipart/form-data">
                <div className="item_row">
                    <div className="item_row_name">
                        앨범명
                    </div>
                    <div className="item_row_field">
                        <input
                        type="text"
                        id="album"
                        name="album"
                        placeholder="앨범명"/>
                    </div>
                </div>
                <div className="item_row">
                    <div className="item_row_name">
                        아티스트
                    </div>
                    <div className="item_row_field">
                        <input
                        type="text"
                        id="singer"
                        name="singer"
                        placeholder="아티스트"/>
                    </div>
                </div>
                <div className="item_row">
                    <div className="item_row_name">
                        배급사
                    </div>
                    <div className="item_row_field">
                        <input
                        type="text"
                        id="supply"
                        name="supply"
                        placeholder="배급사"/>
                    </div>
                </div>
                <div className="item_row">
                    <div className="item_row_name">
                        가격
                    </div>
                    <div className="item_row_field">
                        <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="가격"/>
                    </div>
                </div>
                <div className="item_row">
                    <div className="item_row_name">
                        상세설명
                    </div>
                    <div className="item_row_field">
                        <textarea
                        type="text"
                        id="detail"
                        name="detail"
                        placeholder="상세설명"/>
                    </div>
                </div>
                <div className="item_row">
                    <div className="item_row_name">
                        앨범커버
                    </div>
                    <div className="item_row_field">
                        <input
                        type="file"
                        accept="image/*"
                        id="cover"
                        name="cover"
                        placeholder="상세설명"
                        onChange={onFileChange}/>
                        {attach && (<>
                        <img src={attach} width="50px" height="50px"/>
                        </>)}
                    </div>
                </div>
                <div className="item_row">
                    <div className="item_row_name">
                        장르
                    </div>
                    <div className="item_row_field" id="item_genre_list">
                    {genres.map((i) => (
                        <label key={i.id}>{i.name}<input type="checkbox" name="genre" onChange={(e) => checkHandler(e.target.checked, i.id)}
                        checked = {checkItems.indexOf(i.id) >= 0 ? true : false}/></label> 
                    ))}
                    </div>
                </div>
                <button type="submit" onClick={submitHandler} >등록</button>
            </form>
        </div>
    );
}

export default Additem;
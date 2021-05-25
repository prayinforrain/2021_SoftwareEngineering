import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';


const Additem = () => {
    const [attach, setAttach] = useState();
    //장르 1발라드 2댄스 3랩힙합 4R&B/Soul 5인디 6록메탈 7트로트 8포크블루스

    const submitHandler = (e) => {
        e.preventDefault();
        const form = document.getElementById("add_item_form");
        const {
            album,
            singer,
            supply,
            price,
            detail,
            cover
        } = form;
        const file = cover.files[0];
        console.log(file);
        axios({
            method: "POST",
            url: "http://localhost:3001/upload",
            data: {
                cover: file
            },
            //headers: {'content-type' : 'multipart/form-data'},
        }).then((res) => {
            console.log(res);
            alert('등록 완료');
        }).catch(err=>{
            console.log("err occured : " + err);
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
            <form id="add_item_form" encType="multipart/form-data">
                <div className="item_row">
                    <div className="item_row_name">
                        앨범명
                    </div>
                    <div className="item_row_field">
                        <input
                        type="text"
                        id="album"
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
                <button type="submit" onClick={submitHandler}>등록</button>
            </form>
        </div>
    );
}

export default Additem;
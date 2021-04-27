import React from "react";
import img01 from "../img/01.jpg";

const Main = () => {
    return (
        <div id="main">
            <div id="main_container">
                <div class="menu">
                    <ul>
                        <li valign="top">
                            <a class="active" href="#home">
                                menu
                            </a>
                        </li>
                        <li>
                            <a href="#menu1">menu1</a>
                        </li>
                        <li>
                            <a href="#menu2">menu2</a>
                        </li>
                    </ul>
                </div>
                <div id="content_container">
                    <div id="event_banner">
                        <br />
                        <p>
                            <em>이달의 추천</em>
                        </p>
                        <br />

                        <img
                            src={img01}
                            id="main_image"
                            alt="main"
                            style={{
                                width: "500px",
                                height: "500px",
                            }}
                        />
                    </div>
                    <div id="notice">
                        <a href="https://www.naver.com">
                            공지1
                            <br />
                        </a>
                        <a href="https://www.naver.com">
                            공지2
                            <br />
                        </a>
                        <a href="https://www.naver.com">
                            공지3
                            <br />
                        </a>
                        <a href="https://www.naver.com">
                            공지4
                            <br />
                        </a>
                        <a href="https://www.naver.com">
                            공지5
                            <br />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;

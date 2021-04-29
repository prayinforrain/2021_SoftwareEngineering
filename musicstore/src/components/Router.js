import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Mainpage from "../Mainpage";
import Mypage from "../Mypage";
import Managerpage from "../Managerpage";
import Header from "./Header";
import Footer from "./Footer";
import Cart from "./Mypage/Cart";
import Cs from "./Mypage/Cs";
import Tracking from "./Mypage/Tracking";
import Wishlist from "./Mypage/Wishlist";
import ItemInfo from "./ItemInfo";
import Destination from "./Mypage/Destination";
import MypageMenu from "./Mypage/MypageMenu";

/*
트리 상 가장 위에 있는 페이지(가장 넓은 범주)를 아래로 넣을 것!
예를 들면 마이페이지(/mypage) 안에 찜 목록(/mypage/wishlist)이 있는 경우
<찜 목록 라우팅>
<마이페이지 라우팅>
순으로 들어가 있어야 함
*/

function WebRouter({ openSignup, openLogin, openDestinationEnrollModal }) {
    return (
        <Router>
            <Switch>
                <Route exact path="/test">
                    <Header openSignup={openSignup} openLogin={openLogin} />
                    <div id="main_container">
                        <MypageMenu />
                        <ItemInfo />
                    </div>
                    <Footer />
                </Route>
                <Route exact path="/mypage/destination">
                    <Header openSignup={openSignup} openLogin={openLogin} />
                    <div id="main_container">
                        <MypageMenu />
                        <Destination
                            openDestinationEnrollModal={
                                openDestinationEnrollModal
                            }
                        />
                    </div>
                    <Footer />
                </Route>
                <Route exact path="/mypage/cart">
                    <Header openSignup={openSignup} openLogin={openLogin} />
                    <div id="main_container">
                        <MypageMenu />
                        <Cart />
                    </div>
                    <Footer />
                </Route>
                <Route exact path="/mypage/service-center">
                    <Header openSignup={openSignup} openLogin={openLogin} />
                    <div id="main_container">
                        <MypageMenu />
                        <Cs />
                    </div>
                    <Footer />
                </Route>
                <Route exact path="/mypage/tracking">
                    <Header openSignup={openSignup} openLogin={openLogin} />
                    <div id="main_container">
                        <MypageMenu />
                        <Tracking />
                    </div>
                    <Footer />
                </Route>
                <Route exact path="/mypage/wishlist">
                    <Header openSignup={openSignup} openLogin={openLogin} />
                    <div id="main_container">
                        <MypageMenu />
                        <Wishlist />
                    </div>
                    <Footer />
                </Route>
                <Route exact path="/mypage/service_center">
                    <Header openSignup={openSignup} openLogin={openLogin} />
                    <div id="main_container">
                        <MypageMenu />
                        <Cs />
                    </div>
                    <Footer />
                </Route>
                <Route exact path="/mypage">
                    <Mypage openSignup={openSignup} openLogin={openLogin} />
                </Route>
                <Route exact path="/manage">
                    <Managerpage
                        openSignup={openSignup}
                        openLogin={openLogin}
                    />
                </Route>
                <Route path="/">
                    <Mainpage openSignup={openSignup} openLogin={openLogin} />
                </Route>
            </Switch>
        </Router>
    );
}

export default WebRouter;

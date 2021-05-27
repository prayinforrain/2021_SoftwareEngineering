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
import Additem from "./Manage/Additem";
import SearchResult from "./SearchResult";


/*
트리 상 가장 위에 있는 페이지(가장 넓은 범주)를 아래로 넣을 것!
예를 들면 마이페이지(/mypage) 안에 찜 목록(/mypage/wishlist)이 있는 경우
<찜 목록 라우팅>
<마이페이지 라우팅>
순으로 들어가 있어야 함
*/

// '/test' 주소에 들어간 ItemInfo의 queryID를 백엔드에 보내서 요청하는 상품의 ID를 지정

function WebRouter({ user, onLogout, openSignup, openLogin  }) {
    return (
        <Router>
            <Switch>
                <Route exact path="/test">
                    <Additem/>
                </Route>
                <Route exact path="/search/:SearchOption/:Keyword">
                    <Header user={user} onLogout={onLogout} openSignup={openSignup} openLogin={openLogin} />
                    <div id="main_container">
                        <SearchResult />
                    </div>
                    <Footer />
                </Route>
                <Route exact path="/itemInfo/:itemID">
                    <Header user={user} onLogout={onLogout} openSignup={openSignup} openLogin={openLogin} />
                    <div id="main_container">
                        <ItemInfo user = {user} />
                    </div>
                    <Footer />
                </Route>
                <Route exact path="/mypage/destination">
                    <Header user={user} onLogout={onLogout} openSignup={openSignup} openLogin={openLogin} />
                    <div id="main_container">
                        <MypageMenu />
                        <Destination
                            user= {user}
                        />
                    </div>
                    <Footer />
                </Route>
                <Route exact path="/mypage/cart">
                    <Header user={user} onLogout={onLogout}  openSignup={openSignup} openLogin={openLogin} />
                    <div id="main_container">
                        <MypageMenu />
                        <Cart user = {user}/>
                    </div>
                    <Footer />
                </Route>
                <Route exact path="/mypage/service-center">
                    <Header user={user} onLogout={onLogout}  openSignup={openSignup} openLogin={openLogin} />
                    <div id="main_container">
                        <MypageMenu />
                        <Cs />
                    </div>
                    <Footer />
                </Route>
                <Route exact path="/mypage/tracking">
                    <Header user={user} onLogout={onLogout}  openSignup={openSignup} openLogin={openLogin} />
                    <div id="main_container">
                        <MypageMenu />
                        <Tracking />
                    </div>
                    <Footer />
                </Route>
                <Route exact path="/mypage/wishlist">
                    <Header user={user} onLogout={onLogout} openSignup={openSignup} openLogin={openLogin} />
                    <div id="main_container">
                        <MypageMenu />
                        <Wishlist />
                    </div>
                    <Footer />
                </Route>
                <Route exact path="/mypage/service_center">
                    <Header user={user} onLogout={onLogout}  openSignup={openSignup} openLogin={openLogin} />
                    <div id="main_container">
                        <MypageMenu />
                        <Cs />
                    </div>
                    <Footer />
                </Route>
                <Route exact path="/mypage">
                    <Mypage user={user} onLogout={onLogout}  openSignup={openSignup} openLogin={openLogin} />
                </Route>
                <Route exact path="/manage">
                    <Managerpage
                        openSignup={openSignup}
                        openLogin={openLogin}
                    />
                </Route>
                <Route path="/">
                    <Mainpage user={user} onLogout={onLogout}  openSignup={openSignup} openLogin={openLogin} />
                </Route>
            </Switch>
        </Router>
    );
}

export default WebRouter;

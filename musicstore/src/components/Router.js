import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Mainpage from "../Mainpage";
import Mypage from "../Mypage";
import Managerpage from "../Managerpage";

//트리 상 가장 위에 있는 페이지(가장 넓은 범주)를 아래로 넣을 것!

function WebRouter() {
    return(
        <Router>
            <Switch>
                
                <Route exact path="/mypage">
                    <Mypage/>
                </Route>
                <Route exact path="/manage">
                    <Managerpage/>
                </Route>
                <Route path="/">
                    <Mainpage/>
                </Route>
            </Switch>
        </Router>
    )
}

export default WebRouter;
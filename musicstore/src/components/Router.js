import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Mainpage from "../Mainpage";
import Mypage from "../Mypage";
import Managerpage from "../Managerpage";


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
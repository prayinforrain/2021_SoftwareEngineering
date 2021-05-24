import "./App.css";
import WebRouter from "./components/Router";
import { useState, useEffect } from "react";
import ModalPortal from "./ModalPortal";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import DestinationEnroll from "./components/DestinationEnroll";
import axios from "axios";

function App() {
    const [login_modal, set_login_modal] = useState(false);
    const [signup_modal, set_signup_modal] = useState(false);
    const [destination_enroll_modal, set_destination_enroll_modal] = useState(
        false
    );
    const [user, setUser] =useState('');
    const openSignupModal = () => {
        set_signup_modal(true);
    };
    const closeSignupModal = () => {
        set_signup_modal(false);
    };
    const openLoginModal = () => {
        set_login_modal(true);
    };
    const closeLoginModal = () => {
        set_login_modal(false);
    };
    const requestUserInfo = () => {
        console.log('user');
        console.log(user);
        axios.get('http://localhost:3001/login')
        .then(function(response) {
            console.log(response.data);
        }).catch(function(err){
            console.log('requestUserInfo axios error');
            console.error(err);
        })
    }
    const openDestinationEnrollModal = () => {
        set_destination_enroll_modal(true);
    };
    const closeDestinationEnrollModal = () => {
        set_destination_enroll_modal(false);
    };
    const onLogin=(data)=>{
        setUser(data);
    }
    const onLogout=()=>{
        setUser('');
    }
    
    return (
        <div className="App">
            <div id="loginCheck" style={{width:"100px", height:"100px", border:"5px solid black", position:"absolute", left:"0", top:"50%"}}  onClick={requestUserInfo}>테스트</div>
            <WebRouter
                user={user}
                onLogout={onLogout} 
                openLogin={openLoginModal}
                openSignup={openSignupModal}
                openDestinationEnrollModal={openDestinationEnrollModal}
            />
            {login_modal && (
                <ModalPortal>
                    <Login onLogin={onLogin} onClose={closeLoginModal} />
                </ModalPortal>
            )}
            {signup_modal && (
                <ModalPortal>
                    <SignUp onClose={closeSignupModal} />
                </ModalPortal>
            )}
            {destination_enroll_modal && (
                <ModalPortal>
                    <DestinationEnroll onClose={closeDestinationEnrollModal} />
                </ModalPortal>
            )}
        </div>
    );
}

export default App;

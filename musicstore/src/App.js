import "./App.css";
import WebRouter from "./components/Router";
import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from "react";
import ModalPortal from "./ModalPortal";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import DestinationEnroll from "./components/DestinationEnroll";
import axios from "axios";
import Manage from './Managerpage'

function App() {
    const id = window.sessionStorage.id;
    console.log(id);
    useEffect(() => {
        if(id){
            axios({ method:'post', url : 'http://localhost:3001/userInfo', data:{ userID : id}})
                .then(response => {
                    console.log(response.data);
                    if(!user){
                        setUser(response.data);
                    }
                }).catch(err => {
                    console.log('in App useEffect');
                    console.error(err);
                });
        }
    })
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
        window.sessionStorage.clear();
        setUser('');

    }
    
    return (
        <div className="App">
            {user.userID === 'admin' ? (
                <BrowserRouter>
                    <Manage user={user} onLogout={onLogout}/>
                </BrowserRouter>
            ):(
                <WebRouter
                user={user}
                onLogout={onLogout} 
                openLogin={openLoginModal}
                openSignup={openSignupModal}
                openDestinationEnrollModal={openDestinationEnrollModal}
            />
            )}
            
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
            <div style={{width:'100px', height:'100px', border:'5px solid black', position:'absolute', left:'0', top:'50%'}} onClick={requestUserInfo}>Test</div>
            <div style={{width:'100px', height:'100px', border:'5px solid red', position:'absolute', left:'0', top:'70%'}} onClick={()=>{ console.log(window.sessionStorage.id); }}>Test2</div>
        </div>
    );
}

export default App;

import "./App.css";
import WebRouter from "./components/Router";
import { useState } from "react";
import ModalPortal from "./ModalPortal";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import DestinationEnroll from "./components/DestinationEnroll";

function App() {
    const [login_modal, set_login_modal] = useState(false);
    const [signup_modal, set_signup_modal] = useState(false);
    const [destination_enroll_modal, set_destination_enroll_modal] = useState(
        false
    );
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

    const openDestinationEnrollModal = () => {
        set_destination_enroll_modal(true);
    };
    const closeDestinationEnrollModal = () => {
        set_destination_enroll_modal(false);
    };
    return (
        <div className="App">
            <WebRouter
                openLogin={openLoginModal}
                openSignup={openSignupModal}
                openDestinationEnrollModal={openDestinationEnrollModal}
            />
            {login_modal && (
                <ModalPortal>
                    <Login onClose={closeLoginModal} />
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

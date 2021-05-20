import Header from "./components/Header";
import Footer from "./components/Footer";
import MypageMenu from "./components/Mypage/MypageMenu";
import Myinfo from "./components/Mypage/Myinfo";
import "./style/common.css";

function Mypage({ user, onLogout, openSignup, openLogin }) {
    return (
        <div className="App">
            <Header user={user} onLogout={onLogout} openSignup={openSignup} openLogin={openLogin} />
            <div id="main_container">
                <MypageMenu />
                <Myinfo />
            </div>
            <Footer />
        </div>
    );
}

export default Mypage;

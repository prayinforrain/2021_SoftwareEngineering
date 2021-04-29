import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
function App({ openSignup, openLogin }) {
    return (
        <div className="App">
            <Header openSignup={openSignup} openLogin={openLogin} />
            <Main />
            <Footer />
        </div>
    );
}

export default App;

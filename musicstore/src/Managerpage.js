import Header from "./components/Header";
import Footer from "./components/Footer";
import ManagerSection from "./components/ManagerSection";

function App({ openSignup, openLogin }) {
    return (
        <div className="App">
            <Header openSignup={openSignup} openLogin={openLogin} />
            <ManagerSection />
            <Footer />
        </div>
    );
}

export default App;

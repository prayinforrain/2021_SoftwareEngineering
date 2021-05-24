import Header from "./components/Header";
import Footer from "./components/Footer";
import ManagerSection from "./components/ManagerSection";

function App({ user, onLogout,})  {
    return (
        <div className="App">
            <Header user={user} onLogout={onLogout} />
            <ManagerSection />
            <Footer />
        </div>
    );
}

export default App;

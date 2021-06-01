import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
function App({ user, onLogout, openSignup, openLogin, openItemModal, closeItemModal }) {
	return (
		<div className="App">
			<Header user={user} onLogout={onLogout} openSignup={openSignup} openLogin={openLogin} />
			<Main openItemModal={openItemModal} closeItemModal={closeItemModal} />
			<Footer />
		</div>
	);
}

export default App;

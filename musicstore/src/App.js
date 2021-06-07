import './App.css';
import WebRouter from './components/Router';
import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ModalPortal from './ModalPortal';
import SignUp from './components/SignUp';
import Login from './components/Login';
import PurchaseItem from './components/PurchaseItem';
import axios from 'axios';
import Manage from './Managerpage';
import PurchasePopup from './components/PurchasePopup';
import * as config from './components/Config';

function App() {
	const id = window.sessionStorage.id;
	useEffect(() => {
		if (id) {
			axios({ method: 'post', url: `${config.BACKEND_URL}/userInfo`, data: { userID: id } })
				.then(response => {
					if (!user) {
						setUser(response.data);
					}
				})
				.catch(err => {
					console.log('in App useEffect');
					console.error(err);
				});
		}
	}, []);
	const [login_modal, set_login_modal] = useState(false);
	const [signup_modal, set_signup_modal] = useState(false);
	const [item, setItem] = useState(false);
	const [user, setUser] = useState('');
	const [purchase, setPurchase] = useState(false);
	const [buyList, setBuyList] = useState([]);
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
	const onLogin = data => {
		setUser(data);
	};
	const onLogout = () => {
		window.sessionStorage.clear();
		setUser('');
	};
	const openItemModal = num => {
		setItem(num);
	};
	const closeItemModal = () => {
		setItem(false);
	};

	const closePurchaseModal = () => {
		setPurchase(false);
	};
	return (
		<div className="App">
			{user.userID === 'admin' ? (
				<BrowserRouter>
					<Manage user={user} onLogout={onLogout} />
				</BrowserRouter>
			) : (
				<WebRouter
					user={user}
					setUser={setUser}
					onLogout={onLogout}
					openLogin={openLoginModal}
					openSignup={openSignupModal}
					openItemModal={openItemModal}
					closeItemModal={closeItemModal}
					setBuyList={setBuyList}
					setPurchase={setPurchase}
				/>
			)}

			{login_modal && (
				<ModalPortal>
					<Login onLogin={onLogin} onClose={closeLoginModal} />
				</ModalPortal>
			)}
			{signup_modal && (
				<ModalPortal>
					<SignUp onLogin={onLogin} onClose={closeSignupModal} />
				</ModalPortal>
			)}
			{item && (
				<ModalPortal>
					<PurchaseItem
						setBuyList={setBuyList}
						setPurchase={setPurchase}
						item={item}
						setItem={setItem}
						onClose={closeItemModal}
					/>
				</ModalPortal>
			)}
			{purchase && (
				<ModalPortal>
					<PurchasePopup buyList={buyList} onClose={closePurchaseModal} />
				</ModalPortal>
			)}
		</div>
	);
}

export default App;

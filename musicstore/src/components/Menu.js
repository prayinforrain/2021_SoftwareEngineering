import { Link } from 'react-router-dom';

const Menu = () => {
	return (
		<div className="menu">
			<ul>
				<li valign="top">
					<Link to="/search/ballad">발라드</Link>
				</li>
				<li>
					<Link to="/search/dance">댄스</Link>
				</li>
				<li>
					<Link to="/search/rap">랩/힙합</Link>
				</li>
				<li>
					<Link to="/search/rnb">R&B/Soul</Link>
				</li>
				<li>
					<Link to="/search/indi">인디</Link>
				</li>
				<li>
					<Link to="/search/rock">록/메탈</Link>
				</li>
				<li>
					<Link to="/search/trot">트로트</Link>
				</li>
				<li>
					<Link to="/search/fork">포크/블루스</Link>
				</li>
			</ul>
		</div>
	);
};

export default Menu;

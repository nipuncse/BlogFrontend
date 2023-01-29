import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const withAuth = (Component) => {
	return (props) => {
		const navigate = useNavigate();
		// const { currentUser, setCurrentUser } = useContext(UserContext);
		const items = JSON.parse(localStorage.getItem('whoisthis'));

		useEffect(() => {
			// debugger;
			if (items?.username) {
				// Redirect to login page
				navigate('/homepage');
				// setCurrentUser({
				// 	username: items.username,
				// 	password: items.password
				// })
			}
		}, [navigate, items]);
		return <Component {...props} />;
	}
}

export default withAuth;
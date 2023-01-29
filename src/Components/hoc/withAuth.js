import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../App";

const withAuth = (Component) => {
	return (props) => {
		const navigate = useNavigate();
		const { currentUser, setCurrentUser } = useContext(UserContext);
		const items = JSON.parse(localStorage.getItem('whoisthis'));

		useEffect(() => {
			// debugger;
			if (!items?.username) {
				// Redirect to login page
				navigate('/login');
				toast.error("Please login first!!")
				// setCurrentUser({
				// 	username: items.username,
				// 	password: items.password
				// })
			}
		}, [navigate, items]);
		if (!items?.username) {
			return null;
		}
		return <Component {...props} />;
	}
}

export default withAuth;
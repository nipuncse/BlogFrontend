import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import Homepage from './Components/Homepage';
import Deleteblog from './Components/Deleteblog';
import Mystats from './Components/Mystats';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidebarParent from './Components/SidebarParent';
import { useState, createContext } from 'react';
import { ToastContainer } from 'react-toastify';


import 'react-toastify/dist/ReactToastify.css';
import Topnav from './Components/Topnav';
import Newblog from './Components/Newblog';
import Categoryblog from './Components/Categoryblog';
import Editblog from './Components/Editblog';
import Finaledit from './Components/Finaledit';
import { RxCodesandboxLogo } from 'react-icons/rx';
import Readblog from './Components/Readblog';
import Developer from './Components/Developer';
// import classes from './css/sidebarparent.module.css'
// import classes1 from './css/page.module.css'

export const UserContext = createContext()
function App() {

	// let navigate = useNavigate()

	const [currentUser, setCurrentUser] = useState(
		{
			username: undefined,
			password: undefined
		}
	)
	// const user = useContext(UserContext)
	// const items = localStorage.getItem('whoisthis')
	// console.log(currentUser.username.length)
	return (
		<>
			<div style={{ display: 'flex' }}>
				<UserContext.Provider value={{ currentUser, setCurrentUser }}>
					<div >
						<SidebarParent />
					</div>

					<div style={{ width: '100%', height: '100vh', overflow: 'auto' }}>
						{localStorage.getItem('whoisthis') && <Topnav />}
						<BrowserRouter>
							<Routes>
								<Route exact path="/homepage" element={<Homepage />} />
								<Route exact path="/developer" element={<Developer />} />
								<Route exact path="/newblog" element={<Newblog />} />
								<Route exact path="/deleteblog" element={<Deleteblog />} />
								<Route exact path="/editblog" element={<Editblog />} />
								<Route exact path="/finaledit" element={<Finaledit />} />
								<Route exact path="/mystats" element={<Mystats />} />
								<Route exact path="/readblog" element={<Readblog />} />

								<Route exact path="/login" element={<Login />} />
								<Route exact path="/blog" element={<Categoryblog />} />
								<Route exact path="/" element={<Register />}>
								</Route>
							</Routes>
						</BrowserRouter>
					</div>
					<ToastContainer autoClose={1000} style={{ fontSize: '20px' }} />
				</UserContext.Provider >
			</div>

		</>
	);
}

export default App;

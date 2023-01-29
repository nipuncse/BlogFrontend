import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from 'react-pro-sidebar';
import { VscChromeClose } from "react-icons/vsc";
import { SlMenu } from "react-icons/sl";
import { BiCategory } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { HiAnnotation } from "react-icons/hi";
import { RxExit } from "react-icons/rx";
import classes from '../css/sidebar.module.css'
import { useContext } from 'react';
import { UserContext } from '../App';
import { toast } from 'react-toastify';


export default function Sidebar1() {
	const { setCurrentUser } = useContext(UserContext)
	const { collapseSidebar, collapsed } = useProSidebar();
	const items = localStorage.getItem('whoisthis')
	// const navigate = useNavigate()
	const signout = () => {
		setCurrentUser({
			username: undefined,
			password: undefined
		})
		localStorage.removeItem('whoisthis')
		toast.success('Signed Out Successfully')

	}
	const handleMenuItemClick = (url) => {
		window.location.href = url;
	};
	return (
		<div style={{ display: 'flex', height: '100vh' }}>
			<Sidebar backgroundColor='rgb(69 193 247)'
				width='20vw' collapsedWidth='2vw' className={classes.mysidebar}>
				<Menu style={{ marginTop: '25vh' }} menuItemStyles={{
					button: ({ level, active, disabled }) => {
						// only apply styles on first level elements of the tree
						if (level === 0)
							return {
								color: disabled ? '#ffffff' : '#000000',
								backgroundColor: active ? '#eecef9' : undefined,
								textDecorationColor: 'black'
							};
					},
				}}>

					<MenuItem link="/homepage" onClick={() => handleMenuItemClick('/homepage')}> Home </MenuItem>
					<SubMenu label="Categories">

						<MenuItem className={classes.mymenuitem} onClick={() => handleMenuItemClick('/blog?category=Indian Polity')}> Indian Polity </MenuItem>
						<MenuItem onClick={() => handleMenuItemClick('/blog?category=Geopolitics')}>Geopolitics </MenuItem>
						<MenuItem onClick={() => handleMenuItemClick('/blog?category=Indian History')}>Indian History </MenuItem>
						<MenuItem onClick={() => handleMenuItemClick('/blog?category=Economy')}>Economy </MenuItem>
						<MenuItem onClick={() => handleMenuItemClick('/blog?category=Geography')}>Geography </MenuItem>
						<MenuItem onClick={() => handleMenuItemClick('/blog?category=Politics')}>Politics </MenuItem>
						<MenuItem onClick={() => handleMenuItemClick('/blog?category=Tech')}>Tech </MenuItem>
						<MenuItem onClick={() => handleMenuItemClick('/blog?category=Personalities')}>Personalities </MenuItem>
					</SubMenu>

					<MenuItem> Top Blogs    <HiAnnotation size='10%' /></MenuItem>
					<MenuItem>Top Authors   <BsPersonFill size='10%' /></MenuItem>
					<MenuItem> Top Categories    <BiCategory size='10%' /></MenuItem>
					<MenuItem link="/developer" onClick={() => handleMenuItemClick('/developer')}> Developer Profile    <BiCategory size='10%' /></MenuItem>
					{items && <MenuItem onClick={signout}> Sign Out   <RxExit size='10%' /></MenuItem>}
				</Menu>
			</Sidebar>
			<main>
				{!collapsed ?
					<button onClick={() => collapseSidebar()} ><SlMenu size='4vh' style={{ color: 'black' }} /></button>
					:
					<button onClick={() => collapseSidebar()} ><SlMenu size='4vh' style={{ color: 'black' }} /></button>}
			</main>
		</div>
	);
}
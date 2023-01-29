import React, { useContext } from 'react'
import { UserContext } from '../App'
import { IoIosStats } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { MdPostAdd } from "react-icons/md";
export default function Topnav() {
	// const { currentUser } = useContext(UserContext)
	const name = (JSON.parse(localStorage.getItem('whoisthis')).username)
	return (
		<>
			<nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ display: 'flex' }} >
				<div className="container-fluid">
					{/* <a className="navbar-brand" href="/">Hello {name}</a> */}
					<div className='bg-dark' style={{ borderRadius: '5px' }}>
						<a className="navbar-brand text-white mx-2" href="/">The Written Mind</a>
						{/* <a className="navbar-brand text-white" style={{ backgroundColor: 'green', border: '2px solid yellow' }} href="/">{name}</a> */}
						<a className="btn btn-info " role="button" href='/'> {name}</a>


					</div>

					<div className="collapse navbar-collapse float-right" style={{ flexGrow: 0 }} id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item mx-3">
								<a className="btn btn-info " role="button" href='/newblog'> <MdPostAdd></MdPostAdd> Add New</a>
							</li>
							<li className="nav-item mx-3">
								<a className="btn btn-danger " role="button" href='/deleteblog'> <MdDelete></MdDelete> Delete Blogs</a>
							</li>
							<li className="nav-item mx-3">
								<a className="btn btn-success " role="button" href='/editblog'> <FiEdit></FiEdit> Edit Stuff</a>
							</li>
							<li className="nav-item mx-3">
								<a className="btn btn-warning " role="button" href='/mystats'> <IoIosStats></IoIosStats> My Stats</a>
							</li>
							{/* <li className="nav-item ">
								<a className="btn btn-outline-success " role="button" href=''>Primary link</a>
							</li> */}
						</ul>
					</div>
				</div>
			</nav>
		</>
	)
}

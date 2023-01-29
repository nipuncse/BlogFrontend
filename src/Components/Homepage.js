import React, { useState, useEffect } from 'react'
// import classes from '../css/homepage.module.css'
import Blog from './Blog'
import withAuth from './hoc/withAuth'
import axios from 'axios'
import { toast } from 'react-toastify'

const Homepage = () => {
	console.log('This is homepage')
	// console.log('This is homepage')
	// console.log(localStorage.getItem('whoisthis'))
	// var toastId = undefined
	const [newData, setnewData] = useState([]);
	function loader() {
		const toastId = toast.warning('Getting Blogs for You', { autoClose: false });
		return toastId;
	}

	useEffect(() => {
		async function getResults() {
			// const localId = loader()
			try {
				const locid = loader()
				const res = await axios.get("https://blogwebsite-vqdo.onrender.com/allblogs");
				toast.dismiss(locid)
				// console.log(res);
				setnewData(res.data.details.reverse());
				// console.log(res.data.details);
				// if (res.data.details)
			}
			catch (err) {
				// handle err
				console.log(err)
				toast.error('Error loading blogs')

			}
		}
		getResults();
	}, [])
	return (
		<>
			<div className="container mx-auto my-5">
				<div className="row">
					{newData.map((element) => {
						return (
							<Blog key={element.uuid} id={element._id} heading={element.heading} likes={element.usersliked.length} timestamp={element.timestamp} content={element.content} category={element.category} author={element.username} />
						)
					})};

				</div>
			</div>
		</>
	)
}

export default withAuth(Homepage);

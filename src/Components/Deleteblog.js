import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Blog from './Blog2';
import withAuth from './hoc/withAuth'

function Deleteblog() {
	const [newData, setnewData] = useState([]);
	const user = { id: JSON.parse(localStorage.getItem('whoisthis')).username }
	// console.log(user)
	useEffect(() => {
		async function getResults() {
			// console.log(props.login);
			const res = await axios.post("https://blogwebsite-vqdo.onrender.com/getblogbyuser", {
				id: user.id
			});
			setnewData(res.data.details);
			// console.log(res.data.details.length);
			// console.log(res.data.details);
		}
		// async function hello() {
		// const stay = await mywait()
		getResults();

		// }
		// hello();

	}, [user.id])
	return (
		<>
			<h1 className='text-center'>Delete Blogs </h1>
			{/* <div class="alert alert-primary mx-auto" role="alert">
				Data is sorted in recently uploaded manner
			</div> */}
			{newData.length !== 0 && <div className="container mx-auto my-5">
				<div className="row">
					{newData.map((element) => {
						return (
							<Blog login={user.id} key={element.uuid} obid={element._id} likes={element.usersliked.length} heading={element.heading} timestamp={element.timestamp} content={element.content} category={element.category} author={element.username} />
						)
					})};

				</div>
			</div>
			}
			{newData.length === 0 && <div className='text-center text-dark font-lg'>
				<h1 className='display-5'>404: No Blog found in this category!</h1>
				<a className="btn btn-info " role="button" href='/newblog'> Start Writing Now</a>
			</div>}
		</>
	)
}

export default withAuth(Deleteblog)

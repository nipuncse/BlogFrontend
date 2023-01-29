import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import withAuth from './hoc/withAuth';
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";


function Readblog() {
	const [searchParams, setSearchParams] = useSearchParams();
	const blogid = searchParams.get('id')

	const [blogdata, setblogdata] = useState(undefined)
	const [liked, setliked] = useState(0)
	const [likecount, setlikecount] = useState(0)
	// var fetchedblogdata = undefined
	useEffect(() => {
		async function getData() {
			const res = await axios.post("https://blogwebsite-vqdo.onrender.com/getblogdetails", {
				id: blogid
			});

			console.log(res.data.details)
			setblogdata(res.data.details)
			setlikecount(res.data.details[0].usersliked.length)
			if (res.data.details[0].usersliked.includes(JSON.parse(localStorage.getItem('whoisthis')).username)) {
				setliked(1)
			}
		}

		getData()
	}, [blogid])

	// const [nolike, setnolike] = useState(blogdata?.[0].usersliked?.length)

	// const [liked, setliked] = useState(0)
	// if (blogdata?.[0]?.usersliked?.includes(JSON.parse(localStorage.getItem('whoisthis')))) {
	// 	setliked(1)
	// }
	// else {
	// 	setliked(0)
	// }

	// --------------------------------------------------------------------------------------------------------------------


	const updatelikepos = async () => {
		// console.log(val)
		const res = await axios.post("https://blogwebsite-vqdo.onrender.com/updatelikepos", {
			id: blogid,
			// value: val,
			user: JSON.parse(localStorage.getItem('whoisthis')).username
		})
		console.log(res.data.details)
		if (res.data.message === '-1')
			console.log('update failed')

		else if (res.data.message === '1') {
			console.log('update successful')
			console.log(res.data.details)
			setliked(1)
			setlikecount(likecount + 1)
		}
	}


	// --------------------------------------------------------------------------------------------------------------------


	const updatelikeneg = async () => {
		// console.log(val)
		const res = await axios.post("https://blogwebsite-vqdo.onrender.com/updatelikeneg", {
			id: blogid,
			user: JSON.parse(localStorage.getItem('whoisthis')).username
		})
		console.log(res.data.details)

		if (res.data.message === '-1')
			console.log('update failed')

		else if (res.data.message === '1') {
			console.log('update successful')
			// console.log(res.data.details)
			setliked(0)
			setlikecount(likecount - 1)
		}
	}

	// --------------------------------------------------------------------------------------------------------------------


	return (
		<>
			<div className='d-flex mx-3 bg-dark flex-column mt-5'>
				<div className='text-center text-white text-center text-lg my-2'>
					{blogdata?.[0]?.heading?.toUpperCase()}
				</div>
				<div className='d-flex flex-row justify-content-between'>
					<div className='text-white mx-3'>
						Author : {blogdata?.[0]?.username}
					</div>
					<div className='text-white mx-3'>

						{liked > 0 ? (
							<>
								Liked <FcLike role='button' onClick={updatelikeneg} />
								: {likecount}
							</>) : (
							<>
								Like <AiOutlineHeart role='button' onClick={updatelikepos} />
								: {likecount}
							</>
						)}

					</div>

				</div>
			</div>

			<div className=" mx-3 bg-light">
				<div dangerouslySetInnerHTML={{ __html: blogdata?.[0]?.content }} className='text-dark' ></div>
			</div>

		</>
	)
}

export default withAuth(Readblog)

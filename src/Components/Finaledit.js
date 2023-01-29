import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import Editeditor from './Editeditor'
import withAuth from './hoc/withAuth'
import Mystats from './Mystats';

function Finaledit() {
	const [searchParams, setSearchParams] = useSearchParams();
	const id = searchParams.get('id')
	const [blogdata, setblogdata] = useState(undefined)

	useEffect(() => {
		async function getdata() {
			const res = await axios.post("https://blogwebsite-vqdo.onrender.com/getblogdetails", { id: id })
			if (res.data.message === '0')
				console.log('fetch unsuccessful')
			// console.log(res.data.message)

			else if (res.data.message === '1') {
				// console.log(res.data.details)
				setblogdata(res.data.details)
			}
		}
		getdata()
	}, [id])


	return (
		<>
			<h1>Final eDit</h1>
			{/* <h2>{id}</h2> */}
			{/* <Mystats /> */}
			<Editeditor id={id} content={blogdata?.[0].content} category={blogdata?.[0].category} heading={blogdata?.[0].heading} />
		</>
	)
}

export default withAuth(Finaledit)

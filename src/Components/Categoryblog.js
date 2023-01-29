import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Blog from './Blog';
import withAuth from './hoc/withAuth'

function Categoryblog() {
	const [searchParams, setSearchParams] = useSearchParams();

	const [newData, setnewData] = useState([]);
	function loader() {
		const toastId = toast.warning('Getting Blogs for You', { autoClose: false });
		return toastId;
	}
	useEffect(() => {
		async function getResults() {
			// const localId = loader()
			const cat = { category: searchParams.get("category") };
			if (cat.category === undefined) return;
			try {
				const locid = loader()
				const res = await axios.post("https://blogwebsite-vqdo.onrender.com/bycategory", cat);
				toast.dismiss(locid)
				// console.log(res);
				if (res.data.message === "1") {
					toast.success("Fetch Successful")
					// console.log(res.data.details);
					setnewData(res.data.details);
				}
				// if (res.data.details)
			}
			catch (err) {
				// handle err
				toast.error("Fetch Error")
				// console.log(err)
				toast.error('Error loading blogs')

			}
		}
		getResults();
	}, [])
	return (
		<>
			<h1 className='text-center text-white'>{searchParams.get("category")}</h1>

			<div className="container mx-auto my-5">
				<div className="row">
					{newData?.length ?
						newData.map((element) => {
							return (
								<Blog key={element.uuid} heading={element.heading} timestamp={element.timestamp} content={element.content} category={element.category} author={element.username} />
							)
						})
						:
						<div className='text-center text-dark font-lg'>
							<h1 className='display-5'>404: No Blog found in this category!</h1>
							<a className="btn btn-info " role="button" href='/newblog'> Start Writing Now</a>
						</div>
					}
				</div>
			</div>

		</>
	)
}

export default withAuth(React.memo(Categoryblog))

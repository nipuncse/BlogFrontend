import React from 'react'
import '../css/blogs.css'
import { FcLike } from "react-icons/fc";
import { FiEdit } from "react-icons/fi";
import axios from 'axios';
import { toast } from 'react-toastify';
export default function Blog2(props) {
	// const navigate =
	const text = props.content
	const day = props.timestamp.slice(8, 10)
	const month = props.timestamp.slice(5, 7)
	const year = props.timestamp.slice(0, 4)


	const htmlString = props.content
	const div = document.createElement('div');
	div.innerHTML = htmlString;
	const ntext = div.textContent.slice(0, 100);
	// console.log(ntext)


	function getMonthName(monthNumber) {
		const months = [
			"Jan",
			"Feb",
			"Mar",
			"April",
			"May",
			"June",
			"July",
			"Aug",
			"Sept",
			"Oct",
			"Nov",
			"Dec"
		];
		return months[monthNumber - 1];
	}
	const date = day + ' ' + getMonthName(month) + ' ' + year
	const user = { id: JSON.parse(localStorage.getItem('whoisthis')).username }

	const handleonClick = async (e) => {
		const id = e.target.id
		window.location.href = `/finaledit?id=${id}`
	}

	return (
		<>
			<div className="container col-4 mx-3 my-3" style={{ width: "18rem" }}>
				<div className="card">
					<div className="card__header bg-dark">
						<img src="https://source.unsplash.com/600x400/?computer" alt="card__image" className="card__image" width="600" />
					</div>
					<div className="card__body bg-dark d-flex">
						<div className='d-flex justify-content-between'>
							<span className="tag tag-blue ">{props.category}</span>
							<span className='text-white'><FcLike></FcLike>  {props.likes}</span>
						</div>

						<h4 className='text-white'>{props.heading}</h4>
						<p className='text-white'>{ntext}</p>
						<small className='text-white '>{date}</small>
						<button type="button" id={props.obid} onClick={handleonClick} className='btn btn-success'><FiEdit></FiEdit> Edit Now</button>
					</div>

					{/* <div className="card__footer" >
						<div className="user">
							<img src="https://avatars.dicebear.com/api/adventurer/author.svg?r=50&size=50" alt="user__image" className="user__image" />
							<span className="user__info">
								<h5>{props.author}</h5>
								<small>{date}</small>
							</span>
						</div>
					</div> */}
				</div>
			</div>
		</>
	)
}

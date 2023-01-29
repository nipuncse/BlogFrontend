import React, { useState, useContext } from 'react'
import classes from '../css/login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../App'
import { toast } from 'react-toastify'

export default function Login() {
	let navigate = useNavigate()
	var toastId = undefined
	// var res = undefined
	const { currentUser, setCurrentUser } = useContext(UserContext)
	// const { loading, setLoading } = useState(true)
	const [user, setUser] = useState({
		username: "",
		password: ""
	})
	// localStorage.removeItem('whoisthis')
	const change = e => {
		const { name, value } = e.target
		// console.log(`${name} ${value}`)
		setUser({
			...user,
			[name]: value
		})
	}

	function loader() {
		toastId = toast.warning('Authenticating', { autoClose: false });
		return
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		// const toastId
		if (user.username.length < 5 || user.password.length < 5) {
			toast.error('Username & Password should be greater than 4 length')
			return
		}

		loader()
		const res = await axios.post("https://blogwebsite-vqdo.onrender.com/loginuser", user)

		// setTimeout(() => { toast.dismiss(toastId) }, 5000);
		toast.dismiss(toastId)

		if (res.data.message === true) {
			// console.log(`backend wala ${user}`)
			// console.log(currentUser)
			localStorage.setItem('whoisthis', JSON.stringify(user))
			setCurrentUser({
				username: user.username,
				password: user.password,
			})
			// setLoading(false)

			toast.success('Login Successful')
			navigate('/homepage')
		}
		else {
			toast.error("Wrong credentials ! Try again")
		}
	}

	return (
		<>
			<div className={classes.loginBox}> <img className={classes.user} src="https://i.ibb.co/yVGxFPR/2.png" height="100px" width="100px" alt="loadingImage.." />
				<h3>Sign in</h3>
				<form onSubmit={handleSubmit}>
					<div className={classes.inputBox}>
						<input id="uname" type="text" name="username" onChange={change} value={user.username} placeholder="Username" />
						<input id="pass" type="password" name="password" onChange={change} value={user.password} placeholder="Password" />
					</div>
					<input type="submit" name="" value="Login" />
				</form>

				<div className={classes.textcenter}>
					<Link to="/" style={{ color: "#59238F" }}>Sign Up</Link>
				</div>

			</div>
		</>
	)
}

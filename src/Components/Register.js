import React, { useState } from 'react'
import classes from '../css/register.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import withAuth2 from './hoc/withAuth2'
const Register = () => {
	let navigate = useNavigate()
	var toastId = undefined
	const [user, setUser] = useState({
		username: "",
		password: ""
	})

	const change = e => {
		const { name, value } = e.target
		// console.log(`${name} ${value}`)
		setUser({
			...user,
			[name]: value
		})
	}

	function loader() {
		toastId = toast.success('Registering', { autoClose: false })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		// console.log(user)

		if (user.username.length < 5 || user.password.length < 5) {
			toast.error('Username & Password should be greater than 4 length')
			return
		}

		loader()
		const res = await axios.post("https://blogwebsite-vqdo.onrender.com/registeruser", user)
		toast.dismiss(toastId)
		if (res.data.message === 'success') {
			// console.log(res.data.user)
			// props.updateUser(res.data.user)
			// alert('Registration Successful, Please login to continue')
			toast.success('Registered Successfully')
			toast.success('Please login to continue')
			navigate('/login')
		}
		else
			toast.error('User already Registered')


	}

	return (
		<>
			<div className={classes.loginBox}> <img className={classes.user} src="https://i.ibb.co/yVGxFPR/2.png" height="100px" width="100px" alt="loadingImage.." />
				<h3>Register With Us</h3>
				<form onSubmit={handleSubmit}>
					<div className={classes.inputBox}>
						<input id="uname" type="text" name="username" onChange={change} value={user.username} placeholder="Username" />
						<input id="pass" type="password" name="password" onChange={change} value={user.password} placeholder="Password" />
					</div>
					<input type="submit" name="" value="Register" />
				</form>
				<Link style={{ color: "rgb(255 222 58)" }} to="/login">Already Have an Account ?</Link>



			</div>
		</>
	)
}

export default withAuth2(Register)

import React from 'react'
import { GrLinkedin } from "react-icons/gr";
import { GrGithub } from "react-icons/gr";
import { SiLeetcode } from "react-icons/si";
import { SiGmail } from "react-icons/si";
import { CgMail } from "react-icons/cg";

export default function Developer() {
	return (
		<>
			<div className='container mx-auto my-10 d-flex '>

				<div className='text-white bg-dark'>
					This Website is developed by NIPUN GARG
				</div>

				<div className='links bg-light d-flex flex-column '>
					<a role='button' className='btn btn-info mx-4 my-4' target='_blank' rel="noopener noreferrer" href='https://www.linkedin.com/in/garg-nipun/'><GrLinkedin /> LinkedIn</a>
					<a role='button' className='btn btn-info mx-4 my-4' target='_blank' rel="noopener noreferrer" href='https://github.com/nipuncse'><GrGithub />Github</a>
					<a role='button' className='btn btn-info mx-4 my-4' target='_blank' rel="noopener noreferrer" href='https://leetcode.com/ng_IAS/' ><SiLeetcode />Leetcode</a>
					<a role='button' className='btn btn-info mx-4 my-4' target='_blank' rel="noopener noreferrer" href="mailto: nipun23.cse@gmail.com" ><CgMail />Mail</a>
				</div>
			</div>
		</>
	)
}

import React from 'react'
import withAuth from './hoc/withAuth'
import Texteditor from './Texteditor'

function Newblog() {
	return (
		<>
			<div style={{ textAlign: "center", color: 'white', marginBottom: '5%', marginTop: '5%' }}>
				<h1>Start Writing Your BLOG Here</h1>
			</div>

			{/* <div className="alert alert-warning alert-dismissible" role="alert">
				Don't sign out or refresh until you click on Submit button !
			</div> */}
			<div class="alert alert-warning alert-dismissible fade show" role="alert">
				<strong>				Don't sign out or refresh until you click on Submit button !
				</strong>
				<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
			</div>

			<Texteditor />
		</>
	)
}

export default withAuth(Newblog)

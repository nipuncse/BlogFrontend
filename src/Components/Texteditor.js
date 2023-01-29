import React, { useRef, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';
import axios from 'axios';

const Texteditor = () => {
	const editorRef = useRef(null);
	const id = uuid()
	const ini = "<h3>Start Writing Here with different formatting OPTIONS</h3>"

	const welcome = "<h3>Start Writing Here with different formatting OPTIONS</h3>"
	const selectVal = useRef(null);
	const headVal = useRef(null);
	var toastId = undefined

	function loader() {
		toastId = toast.warning('Saving the Blog', { autoClose: false });
		return
	}

	const handleSave = async () => {

		const selectedValue = selectVal.current.value;
		const headingValue = headVal.current.value;
		// console.log(selectedValue)
		console.log(`This is uuid ` + id)
		// console.log(headingValue)

		if (headingValue === "") {
			toast.error('Blog Heading cannot be empty')
			return
		}

		if (headingValue.length > 42) {
			toast.error('Blog Heading should be less than 42 charcters')
			return
		}

		if (selectedValue === "0") {
			toast.error('Please select a category for the blog')
			return
		}

		const eddata = editorRef.current.getContent()

		// console.log('editor wali -->' + editorRef.current.getContent());
		// console.log('welcome wali -->' + welcome)
		if (editorRef?.current.getContent() === welcome) {
			// setValue(editorRef?.current?.getContent());
			toast.error(`Data can't be submitted empty `)
			return
		}

		var today = new Date()
		// var curdate = today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
		// console.log(today)

		const user = {
			username: JSON.parse(localStorage.getItem('whoisthis')).username,
			uuid: id,
			heading: headingValue,
			content: eddata,
			category: selectedValue,
			timestamp: today
		}

		loader()
		const res = await axios.post("https://blogwebsite-vqdo.onrender.com/addblog", user)
		toast.dismiss(toastId)

		// // setTimeout(() => { toast.dismiss(toastId) }, 5000);
		// toast.dismiss(toastId)

		if (res.data.message === '1')
			toast.success('Blog Updated Succesfully')

		else if (res.data.message === '0')
			toast.success('Blog Added Successfully')
		else if (res.data.message === '-1')
			toast.error('Connection Error')

	}



	return (
		<>
			<div class="input-group my-3 ">
				<span class="input-group-text">Heading for Blog</span>
				<input ref={headVal} placeholder="Write Here..." type="text" style={{ fontWeight: 'bold', textTransform: 'uppercase' }} aria-label="First name" class="form-control" />
			</div>

			<select ref={selectVal} class="form-select form-select-sm mb-3 bg-dark text-white " aria-label=".form-select-lg example">
				<option selected value="0">Define Category</option>
				<option value="Indian Polity">Indian Polity</option>
				<option value="Geopolitics">Geopolitics</option>
				<option value="Indian History">Indian History</option>
				<option value="Economy">Economy</option>
				<option value="Geography">Geography</option>
				<option value="Politics">Politics</option>
				<option value="Tech">Tech</option>
				<option value="Personalities">Personalities</option>
			</select>

			<Editor
				ref={editorRef}
				// onChange={handleOnChange}
				onInit={(evt, editor) => editorRef.current = editor}
				initialValue={ini}
				init={{
					// setup: function (ed) {
					// 	ed.on('change', function (e) {
					// 		console.log('the event object ', e);
					// 		console.log('the editor object ', ed);
					// 		console.log('the content ', ed.getContent());
					// 	});
					// },
					// onchange_callback: "handleOnChange",
					selector: 'textarea',
					height: 300,
					menubar: true,
					resize: true,
					images_file_types: 'jpg,svg,webp',
					plugins: [
						'advlist autolink lists link image charmap print preview anchor',
						'searchreplace visualblocks code fullscreen',
						'insertdatetime media table paste code help wordcount',
						'autoresize'
					],
					toolbar: 'undo redo | formatselect | fontselect ' +
						'bold italic backcolor | alignleft aligncenter ' +
						'alignright alignjustify | bullist numlist outdent indent | ' +
						'removeformat | help' + 'image',
					content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
				}}


			/>
			{/* <button >Log editor content</button> */}
			{/* <button onClick={log} type="button" class="btn btn-success d-grid gap-2">Post</button> */}
			<div className="d-grid gap-2 col-6 mx-auto my-3">
				<button className="btn btn-success" onClick={handleSave} type="button">Save</button>
			</div>
		</>
	);
}

export default Texteditor;
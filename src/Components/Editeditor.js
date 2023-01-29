import React, { useRef, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';
import axios from 'axios';

const Texteditor = (props) => {
	const editorRef = useRef(null);
	// const inputRef = useRef(props.heading);
	const ini = props.content
	const cat = props.category
	// console.log(props.heading)
	// console.log(props.category)
	const [inihead, setinihead] = useState(props.heading)

	// var inihead = 
	// setinihead(props.heading)

	// const welcome = "<h3>Start Writing Here with different formatting OPTIONS</h3>"
	// const selectVal = useRef(null);
	// const headVal = useRef(null);
	var toastId = undefined

	const selectRef = useRef();

	useEffect(() => {
		selectRef.current.value = props.category;
	}, [props.category]);

	const headRef = React.useRef();

	useEffect(() => {
		headRef.current.value = props.heading;
	}, [props.heading]);


	function loader() {
		toastId = toast.warning('Saving the Blog', { autoClose: false });
		return
	}

	const handleSave = async () => {
		// console.log(inihead)

		const headingValue = headRef.current.value
		const selectedValue = selectRef.current.value

		// console.log(`This is uuid ` + id)

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

		console.log('editor wali -->' + editorRef.current.getContent());
		// console.log('welcome wali -->' + welcome)
		// if (editorRef?.current.getContent() === welcome) {
		// 	toast.error(`Data can't be submitted empty `)
		// 	return
		// }

		const td = new Date()
		// console.log(td)
		const user = {
			// username: JSON.parse(localStorage.getItem('whoisthis')).username,
			id: props.id,
			heading: headingValue,
			content: eddata,
			category: selectedValue,
			timestamp: td
		}


		loader()
		const res = await axios.post("https://blogwebsite-vqdo.onrender.com/updateblog", user)
		toast.dismiss(toastId)

		if (res.data.message === '1')
			toast.success('Blog Updated Succesfully')

		else if (res.data.message === '-1')
			toast.error('Error')

	}

	return (
		<>
			<div className="input-group my-3 ">
				<span className="input-group-text">Heading for Blog</span>
				<input placeholder="Write Here..." type="text" ref={headRef} style={{ fontWeight: 'bold', textTransform: 'uppercase' }} aria-label="First name" className="form-control" />
			</div>



			<select ref={selectRef} className="form-select form-select-sm mb-3 bg-dark text-white " aria-label=".form-select-lg example">
				<option value="0">Define Category</option>
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
				onInit={(evt, editor) => editorRef.current = editor}
				initialValue={ini}
				init={{
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

			<div className="d-grid gap-2 col-6 mx-auto my-3">
				<button className="btn btn-success" onClick={handleSave} type="button">Save</button>
			</div>
		</>
	);
}

export default Texteditor;
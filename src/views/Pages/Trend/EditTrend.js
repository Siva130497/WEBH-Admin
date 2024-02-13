/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect } from 'react'
import './EditPostManagement.css'
import {
	Button,
	Card,
	CardGroup,
	Row,
	Col,
	Label,
	Input,
	CardTitle
} from 'reactstrap'
import { useNavigate, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import ImageUploader from '../TopicPost/ImageUploader'
import axios from 'axios'
import { RotatingLines } from 'react-loader-spinner'

const EditTrend = () => {
	const navigate = useNavigate()
	const { id } = useParams()

	const [title, setTitle] = useState()
	const [desc, setDesc] = useState()
	const [image, setImage] = useState('')
	const [selectedFile, setSelectedFile] = useState()
	const [titleValidate, setTitleValidate] = useState(true)
	const [descValidate, setDescValidate] = useState(true)
	const [imageValidate, setImageValidate] = useState(true)

	const titleHandler = e => {
		if (e.target.value.trim() === '') {
			setTitleValidate(false)
		} else {
			setTitleValidate(true)
		}
		setTitle(e.target.value)
	}

	const descHandler = e => {
		if (e.target.value.trim() === '') {
			setDescValidate(false)
		} else {
			setDescValidate(true)
		}
		setDesc(e.target.value)
	}

	const catchFileDataHandler = e => {
		if (e.name === '') {
			setImageValidate(false)
		} else {
			setImageValidate(true)
			setSelectedFile(e)
		}
	}
	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(`${process.env.REACT_APP_BASE_URL}/trend/${id}`)

				const responseData = await response.json()

				console.log(responseData)

				setTitle(responseData.title)
				setDesc(responseData.desc)
				setImage(responseData.image)

				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {
				console.log(err)
			}
		}
		sendRequest()
	}, [id])

	const submitHandler = async e => {
		e.preventDefault()
		if (title.trim() === '') {
			setTitleValidate(false)
			return
		}

		if (desc.trim() === '') {
			setContentValidate(false)
			return
		}

		console.log('validate')

		let imageUrl = ''

		if (selectedFile !== undefined) {
			const formData = new FormData()
			formData.append('file', selectedFile)
			formData.append('upload_preset', 'feed_images')

			try {
				await axios
					.post(
						'https://api.cloudinary.com/v1_1/movie-reservation/image/upload',
						formData
					)
					.then(res => {
						imageUrl = res.data.secure_url
					})
			} catch (error) {
				alert(error)
			}
		}

		if (imageUrl !== '') {
			try {
				const response = await fetch(`${process.env.REACT_APP_BASE_URL}/trend/${id}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						desc,
						title,
						image: imageUrl
					})
				})
				const responseData = await response.json()

				if (!response.ok) {
					throw new Error(responseData.message)
				}

				setTitle('')
				setDesc('')
			} catch (err) {
				console.log(err)
			}
			navigate('/trends')
			window.location.reload(true)
		} else {
			try {
				const response = await fetch(`${process.env.REACT_APP_BASE_URL}/trend/${id}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						desc,
						title,
						image
					})
				})
				const responseData = await response.json()

				if (!response.ok) {
					throw new Error(responseData.message)
				}

				setTitle('')
				setDesc('')
			} catch (err) {
				console.log(err)
			}
			navigate('/trends')
			window.location.reload(true)
		}
	}

	return (
		<div className="edit-postManagement-container">
			{!title && !desc && (
				<RotatingLines
					className="text-center"
					strokeColor="grey"
					strokeWidth="5"
					animationDuration="1"
					width="96"
					visible={true}
				/>
			)}
			<form onSubmit={submitHandler} className="edit-postManagement-form">
				<h3>Edit Trend</h3>
				<div className="edit-postManagement-group">
					<h5>Title</h5>
					<input
						onChange={titleHandler}
						value={title}
						type="text"
						placeholder="Enter Title"
					/>
					{!titleValidate && (
						<p style={{ color: 'Red' }}>Title should not be Empty</p>
					)}
				</div>

				<div className="edit-postManagement-group">
					<h5>Description</h5>
					<input
						onChange={descHandler}
						value={desc}
						type="textarea"
						rows="4"
						placeholder="Enter Description"
					/>
					{!descValidate && (
						<p style={{ color: 'Red' }}>Description should not be empty</p>
					)}
				</div>

				<div className="edit-postManagement-group edit-postManagement-group-image">
					<h5>Add Image</h5>
					<ImageUploader
						onInput={catchFileDataHandler}
						value={selectedFile}
						image={image}
					/>
					{!imageValidate && (
						<p style={{ color: 'Red' }}>Image should be selected</p>
					)}
				</div>
				<button type="submit" className="btn" color="primary">
					Update
				</button>
			</form>
		</div>
	)
}

export default EditTrend

/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect } from 'react'
import { Button, Card, Col, CardGroup, CardTitle, Input } from 'reactstrap'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ImageUploader from './ImageUploader'
import { RotatingLines } from 'react-loader-spinner'
import './EditPostManagement.css'
const EditBlog = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [topic, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [image, setImage] = useState('')
	const [selectedFile, setSelectedFile] = useState()
	const [topicValidate, setTopicValidate] = useState(true)
	const [descValidate, setDescValidate] = useState(true)

	const [topicTouched, setTopicTouched] = useState(false)
	const [descTouched, setDescTouched] = useState(false)
	const [formValidate, setFormValidate] = useState(false)

	const validTopic = !topicValidate && topicTouched
	const validDesc = !descValidate && descTouched

	useEffect(() => {
		setFormValidate(topicValidate && descValidate)
	}, [topicValidate, descValidate])

	const titleHandler = e => {
		setTopicTouched(true)
		if (e.target.value.trim() === '') {
			setTopicValidate(false)
		} else {
			setTopicValidate(true)
		}
		setTitle(e.target.value)
	}

	const descHandler = e => {
		setDescTouched(true)
		if (e.target.value.trim() === '') {
			setDescValidate(false)
		} else {
			setDescValidate(true)
		}
		setDesc(e.target.value)
	}

	const catchFileDataHandler = e => {
		setSelectedFile(e)
	}

	const topicBlurHandler = () => {
		setTopicTouched(true)
		if (topic.trim() === '') {
			setTopicValidate(false)
		} else {
			setTopicValidate(true)
		}
	}

	const descBlurHandler = () => {
		setDescTouched(true)
		if (desc.trim() === '') {
			setDescValidate(false)
		} else {
			setDescValidate(true)
		}
	}

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(`${process.env.REACT_APP_BASE_URL}/blog/${id}`)

				const responseData = await response.json()

				console.log(responseData)

				setTitle(responseData.blog.name)
				setDesc(responseData.blog.desc)
				setImage(responseData.blog.image)

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
		if (topic.trim() === '') {
			setTopicValidate(false)
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
				const response = await fetch(`${process.env.REACT_APP_BASE_URL}/blog/${id}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						name: topic,
						desc,
						image: imageUrl
					})
				})

				const responseData = await response.json()

				console.log(responseData)

				if (!response.ok) {
					throw new Error(responseData.message)
				}

				setDesc('')
				setTitle('')
			} catch (err) {
				console.log(err)
			}

			navigate('/blogs')
			window.location.reload(true)
		} else {
			try {
				const response = await fetch(`${process.env.REACT_APP_BASE_URL}/blog/${id}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						name: topic,
						desc,
						image
					})
				})

				const responseData = await response.json()

				console.log(responseData)

				if (!response.ok) {
					throw new Error(responseData.message)
				}

				setDesc('')
				setTitle('')
			} catch (err) {
				console.log(err)
			}

			navigate('/blogs')
			window.location.reload(true)
		}
	}

	return (
		<div className="edit-postManagement-container">
			<form onSubmit={submitHandler} className="edit-postManagement-form">
				<h3>Edit Blog</h3>
				<div className="edit-postManagement-group">
					<h5>Name</h5>
					<input
						onChange={titleHandler}
						value={topic}
						onBlur={topicBlurHandler}
						type="text"
						placeholder="Enter Name"
					/>
					{validTopic && (
						<p style={{ color: 'Red' }}>Name should not be Empty</p>
					)}
				</div>

				<div className="edit-postManagement-group">
					<h5>Description</h5>
					<input
						onChange={descHandler}
						value={desc}
						onBlur={descBlurHandler}
						type="textarea"
						rows="4"
						placeholder="Enter Description"
					/>
					{validDesc && (
						<p style={{ color: 'Red' }}>Description should not be empty</p>
					)}
				</div>

				<div className="edit-postManagement-group edit-postManagement-group-image">
					<h5>Add Blog Image</h5>
					<ImageUploader onInput={catchFileDataHandler} image={image} />
				</div>
				<button
					type="submit"
					className="btn"
					color="primary"
					disabled={!formValidate}>
					Update
				</button>
			</form>
		</div>
	)
}

export default EditBlog

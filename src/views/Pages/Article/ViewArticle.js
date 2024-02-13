/* eslint-disable no-tabs */
import React from 'react'
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Card, CardText } from 'reactstrap'
import './ViewSkill.css'

const ViewArticle = () => {
	const { id } = useParams()
	const [blog, setBlog] = useState()
	const navigate = useNavigate()

	const routeHandler = () => {
		navigate(`/articles/edit/${id}`)
	}

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(`${process.env.REACT_APP_BASE_URL}/article/${id}`)

				const responseData = await response.json()

				console.log(responseData)

				setBlog(responseData)

				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) { }
		}

		sendRequest()
	}, [id])

	const deleteHandler = async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_BASE_URL}/article/${id}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' }
			})

			const responseData = await response.json()

			if (!response.ok()) {
				throw new Error(responseData.message)
			}
		} catch (err) { }

		navigate('/articles')
	}

	return (
		<>
			<Card className="card">
				<div className="image">{blog && <img src={blog.image} />}</div>
				{!blog && (
					<RotatingLines
						className="text-center"
						strokeColor="grey"
						strokeWidth="5"
						animationDuration="1"
						width="96"
						visible={true}
					/>
				)}
				{blog && (
					<div className="details">
						<h1>{blog.title}</h1>
						<CardText>{blog.desc}</CardText>
					</div>
				)}

				{blog && blog.length <= 0 && (
					<CardText className="no-respond">There is no Such Article</CardText>
				)}
			</Card>

			<div className="btns">
				<Button onClick={routeHandler} className="btn">
					Edit
				</Button>
				<Button onClick={deleteHandler} className="btn delete">
					Delete
				</Button>
			</div>
		</>
	)
}

export default ViewArticle

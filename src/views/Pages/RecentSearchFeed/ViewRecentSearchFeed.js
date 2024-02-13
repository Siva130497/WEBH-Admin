/* eslint-disable no-tabs */
import React from 'react'
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardText } from 'reactstrap'
import './ViewSkill.css'

const ViewRecentSearchFeed = () => {
	const { id } = useParams()
	const [skill, setSkill] = useState()
	const navigate = useNavigate()

	const routeHandler = () => {
		navigate(`/recentSearchFeeds/edit/${id}`)
	}
	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_BASE_URL}/recentSearchFeed/${id}`
				)

				const responseData = await response.json()

				console.log(responseData)

				setSkill(responseData)

				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {
				console.log(err)
			}
		}

		sendRequest()
	}, [id])

	const deleteHandler = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_BASE_URL}/recentSearchFeed/${id}`,
				{ method: 'DELETE', headers: { 'Content-Type': 'application/json' } }
			)

			const responseData = await response.json()

			if (!response.ok()) {
				throw new Error(responseData.message)
			}
		} catch (err) {
			console.log(err)
		}

		navigate('/recentSearchFeeds')
	}

	return (
		<>
			{!skill && (
				<RotatingLines
					className="text-center"
					strokeColor="grey"
					strokeWidth="5"
					animationDuration="1"
					width="96"
					visible={true}
				/>
			)}
			<Card className="card">
				<div className="image">{skill && <img src={skill.image} />}</div>
				{skill && (
					<div className="details">
						<h1>{skill.title}</h1>
						<CardText>{skill.desc}</CardText>
					</div>
				)}

				{!skill && (
					<CardText className="no-respond">There is no Such Skill</CardText>
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

export default ViewRecentSearchFeed

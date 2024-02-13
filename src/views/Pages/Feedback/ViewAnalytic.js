/* eslint-disable semi */
/* eslint-disable no-tabs */
import React from 'react'
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardText } from 'reactstrap'
import avatar from './../../../assets/images/users/avatar-1.jpg'
import './ViewSkill.css'

const ViewAnalytic = () => {
	const { id } = useParams()
	const [trend, setTrend] = useState()
	const navigate = useNavigate()

	const routeHandler = () => {
		navigate(`/analytics/edit/${id}`)
	}

	const deleteHandler = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_BASE_URL}/analytics/${id}`,
				{
					method: 'DELETE',
					headers: { 'Content-Type': 'application/json' }
				}
			)

			const responseData = await response.json()

			setTrend(responseData)

			if (!response.ok()) {
				throw new Error(responseData.message)
			}
		} catch (err) { }

		navigate('/analytics')
	}

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_BASE_URL}/analytics/${id}`
				)

				const responseData = await response.json()

				setTrend(responseData)

				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) { }
		}

		sendRequest()
	}, [id])

	return (
		<>
			<Card className="card">
				<div className="image">
					<img src={avatar} />
				</div>
				{trend && (
					<div className="details">
						<h1>{trend.title}</h1>
						<CardText>{trend.desc}</CardText>
					</div>
				)}

				{!trend && (
					<CardText className="no-respond">There is no Such analytics</CardText>
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

export default ViewAnalytic

/* eslint-disable no-tabs */
import React, { useState, useEffect } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import {
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	CardText,
	CardLink,
	Button
} from 'reactstrap'
import RecentSearchFeedList from './RecentSearchFeedList'
import './ViewBlogs.css'

function ViewRecentSearchFeeds() {
	const [skills, setSkills] = useState()
	const navigate = useNavigate()
	const [isSignedIn, setIsSignedIn] = useState(false)
	const [user, setUser] = useState('')

	useEffect(() => {
		//check whether user has signed in
		if (localStorage.getItem('userAuthToken')) {
			setIsSignedIn(true)
			console.log(isSignedIn)

			//get user data
			if (localStorage.getItem('user')) {
				setUser(JSON.parse(localStorage.getItem('user')))
				console.log(user)
			}
		} else {
			setIsSignedIn(false)
		}
	}, [])

	console.log(user, isSignedIn)

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_BASE_URL}/recentSearchFeed`
				)

				const responseData = await response.json()

				console.log(responseData)

				setSkills(responseData)

				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) { }
		}

		sendRequest()
	}, [])

	const routerHandler = () => {
		navigate('/addRecentSearchFeed')
	}

	return (
		<>
			<Button className="btn mb-2" onClick={routerHandler}>
				Add RecentSearchFeed
			</Button>
			{user ? (
				<div>
					<Card>
						<CardBody>
							<Card>
								{skills && <RecentSearchFeedList data={skills} />}
								{skills && skills.length <= 0 && (
									<p>There is no RecentSearchFeed</p>
								)}
								{!skills && (
									<RotatingLines
										className="text-center"
										strokeColor="grey"
										strokeWidth="5"
										animationDuration="1"
										width="96"
										visible={true}
									/>
								)}
							</Card>
						</CardBody>
					</Card>
				</div>
			) : (
				<></>
			)}
		</>
	)
}

export default ViewRecentSearchFeeds

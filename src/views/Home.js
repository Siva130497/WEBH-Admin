/* eslint-disable no-tabs */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-tabs */
import { useEffect, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import {
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	CardText,
	CardLink,
	Row
} from 'reactstrap'
// import './homeItem.css'
import './AnalyticsCard.css'
import {
	Mail,
	FileText,
	Folder,
	Award,
	User,
	List,
	TrendingUp,
	Search,
	HelpCircle,
	MessageCircle,
	BarChart2,
	Paperclip,
	Type,
	Info,
	Eye
} from 'react-feather'
const Home = () => {
	const [isSignedIn, setIsSignedIn] = useState(false)
	const [user, setUser] = useState('')
	const [allData, setAllData] = useState('')
	const [userData, userDataChange] = useState(null)

	//post
	const [allPost, setPostDataChange] = useState('')
	const [allPostData, setAllPostData] = useState('')

	//Blog
	const [allBlog, setBlogDataChange] = useState('')
	const [allBlogCount, setAllPClogCount] = useState('')

	//Article
	const [allArticle, setArticleDataChange] = useState('')
	const [allArticleCount, setAllArticleCount] = useState('')

	//Topic
	const [allTopic, setTopicDataChange] = useState('')
	const [allTopicCount, setAllTopicCount] = useState('')

	//Topic Post
	const [allTopicPost, setTopicPostDataChange] = useState('')
	const [allTopicPostCount, setAllTopicPostCount] = useState('')

	//Advertistment
	const [allAdvPost, setAdvDataChange] = useState('')
	const [allAdvCount, setAllAdvCount] = useState('')

	//Advertistment
	const [allNews, setNewsChange] = useState('')
	const [allNewsCount, setAllNewsCount] = useState('')

	// Advices
	const [adviceCount, setAdviceCount] = useState(0)

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

	// Advice Count
	useEffect(() => {
		fetch(`${process.env.REACT_APP_BASE_URL}/advice`)
			.then(res => {
				return res.json()
			})
			.then(resp => {
				console.log(resp)
				setAdviceCount(Object.keys(resp).length)
			})
			.catch(err => {
				console.log(err.message)
			})
	}, [])

	// Post Count
	useEffect(() => {
		fetch(`${process.env.REACT_APP_BASE_URL}/postManagement/posts`)
			.then(res => {
				return res.json()
			})
			.then(resp => {
				setPostDataChange(resp)
				console.log(resp)
				setAllPostData(Object.keys(resp).length)
				// const allData = count
				console.log(allPostData)
				console.log(allPost)
			})
			.catch(err => {
				console.log(err.message)
			})
	}, [])

	// Blog Count
	useEffect(() => {
		fetch(`${process.env.REACT_APP_BASE_URL}/blog`)
			.then(res => {
				return res.json()
			})
			.then(resp => {
				setBlogDataChange(resp)
				console.log(resp)
				setAllPClogCount(Object.keys(resp).length)
				console.log(allBlogCount)
				console.log(allBlog)
			})
			.catch(err => {
				console.log(err.message)
			})
	}, [])

	// Article Count
	useEffect(() => {
		fetch(`${process.env.REACT_APP_BASE_URL}/article`)
			.then(res => {
				return res.json()
			})
			.then(resp => {
				setArticleDataChange(resp)
				console.log(resp)
				setAllArticleCount(Object.keys(resp).length)
				console.log(allArticleCount)
				console.log(allArticle)
			})
			.catch(err => {
				console.log(err.message)
			})
	}, [])

	// Topic Count
	useEffect(() => {
		fetch(`${process.env.REACT_APP_BASE_URL}/topic/topics`)
			.then(res => {
				return res.json()
			})
			.then(resp => {
				setTopicDataChange(resp)
				console.log(resp)
				setAllTopicCount(Object.keys(resp).length)
				console.log(allTopicCount)
				console.log(allTopic)
			})
			.catch(err => {
				console.log(err.message)
			})
	}, [])

	// Topic Count
	useEffect(() => {
		fetch(`${process.env.REACT_APP_BASE_URL}/topicPost/topicPosts`)
			.then(res => {
				return res.json()
			})
			.then(resp => {
				setTopicPostDataChange(resp)
				console.log(resp)
				setAllTopicPostCount(Object.keys(resp).length)
				console.log(allTopicPostCount)
				console.log(allTopicPost)
			})
			.catch(err => {
				console.log(err.message)
			})
	}, [])

	// Advertistment Count
	useEffect(() => {
		fetch(`${process.env.REACT_APP_BASE_URL}/advertisement`)
			.then(res => {
				return res.json()
			})
			.then(resp => {
				setAdvDataChange(resp)
				console.log(resp)
				setAllAdvCount(Object.keys(resp).length)
				console.log(allAdvCount)
				console.log(allAdvPost)
			})
			.catch(err => {
				console.log(err.message)
			})
	}, [])

	// News Count
	useEffect(() => {
		fetch(`${process.env.REACT_APP_BASE_URL}/news`)
			.then(res => {
				return res.json()
			})
			.then(resp => {
				setNewsChange(resp)
				console.log(resp)
				setAllNewsCount(Object.keys(resp).length)
				console.log(allNewsCount)
				console.log(allNews)
			})
			.catch(err => {
				console.log(err.message)
			})
	}, [])

	// User Count
	useEffect(() => {
		fetch(`${process.env.REACT_APP_BASE_URL}/user`)
			.then(res => {
				return res.json()
			})
			.then(resp => {
				userDataChange(resp)
				console.log(resp)
				setAllData(Object.keys(resp).length)
				console.log(userData)
			})
			.catch(err => {
				console.log(err.message)
			})
	}, [])

	return (
		<>
			{user ? (
				<div>
					<Card>
						<CardBody>
							<Row className="card">
								{/* Post Count  */}
								<div className="skill_card">
									<div className="title">Total Posts</div>
									<div className="count">{allPostData}</div>
									<Link to="/postManagements" className="btn btn-primary mb-1">
										All Posts <Paperclip size={15} />
									</Link>
								</div>

								{/* Blog Count  */}
								<div className="skill_card">
									<div className="title">Total Blogs</div>
									<div className="count">{allBlogCount}</div>
									<Link to="/blogs" className="btn btn-primary mb-1">
										All Blogs <FileText size={15} />
									</Link>
								</div>

								{/* Article Count  */}
								<div className="skill_card">
									<div className="title">Total Articles</div>
									<div className="count">{allArticleCount}</div>
									<Link to="/articles" className="btn btn-primary mb-1">
										All Articles <Folder size={15} />
									</Link>
								</div>

								{/* Topic Count  */}
								<div className="skill_card">
									<div className="title">Total Topic</div>
									<div className="count">{allTopicCount}</div>
									<Link to="/topics" className="btn btn-primary mb-1">
										All Topics{' '}
									</Link>
								</div>

								{/* Topic Posts Count  */}
								<div className="skill_card">
									<div className="title">TopicPosts</div>
									<div className="count">{allTopicPostCount}</div>
									<Link to="/topicPosts" className="btn btn-primary mb-1">
										All TopicPosts{' '}
									</Link>
								</div>

								{/* Advertisements Count  */}
								<div className="skill_card">
									<div className="title">Advertisements</div>
									<div className="count">{allAdvCount}</div>
									<Link to="/advertisements" className="btn btn-primary mb-1">
										Advertisement
									</Link>
								</div>

								{/* News Count  */}
								<div className="skill_card">
									<div className="title">News</div>
									<div className="count">{allNewsCount}</div>
									<Link to="/news" className="btn btn-primary mb-1">
										All News <Mail size={15} />
									</Link>
								</div>

								{/* User Count  */}
								<div className="skill_card">
									<div className="title">Users</div>
									<div className="count">{allData}</div>
									<Link to="/user" className="btn btn-primary mb-1">
										All Users <User size={15} />
									</Link>
								</div>

								{/* Post Count  */}
								<div className="skill_card">
									<div className="title">Total Advices</div>
									<div className="count">{adviceCount}</div>
									<Link to="/advices" className="btn btn-primary mb-1">
										All Advices
									</Link>
								</div>
							</Row>
						</CardBody>
					</Card>
				</div>
			) : (
				<></>
			)}
		</>
	)
}

export default Home

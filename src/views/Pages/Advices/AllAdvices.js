/* eslint-disable no-tabs */
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './advice.css'
const AllAdvices = () => {
	const [userData, userDataChange] = useState(null)
	const navigate = useNavigate()
	const [isSignedIn, setIsSignedIn] = useState(false)
	const [user, setUser] = useState('')
	const [allData, setAllData] = useState(0)
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

	const LoadDetail = _id => {
		navigate(`${_id}`)
	}

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BASE_URL}/advice`)
			.then(res => {
				return res.json()
			})
			.then(resp => {
				userDataChange(resp)
				console.log(resp)
				setAllData(Object.keys(resp).length)
				console.log(allData)
			})
			.catch(err => {
				console.log(err.message)
			})
	}, [])
	return (
		<>
			{user ? (
				<div className="user-container">
					<div className="user-card">
						<div className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
							<h2 className="m-2">Advices</h2>
							<Link to="new" className={`btn btn-primary m-2 ${allData > 3 ? 'disabled' : ''}`} >
								New
							</Link>
						</div>
						<div className="table-responsive">
							<table className="table">
								<thead className="primary">
									<tr style={{ textAlign: 'left' }}>
										<th scope="col">Title</th>
									</tr>
								</thead>

								<tbody style={{ textAlign: 'left' }}>
									{userData &&
										userData.map(item => (
											<tr key={item._id} onClick={() => LoadDetail(item._id)}>
												<td>{item.title || ''}</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	)
}

export default AllAdvices

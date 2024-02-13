/* eslint-disable no-tabs */
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import {
	Mail,
	Home,
	FileText,
	Circle,
	Edit,
	Delete,
	Info,
	Eye,
	PlusCircle
} from 'react-feather'
import './user.css'
import { FormControl } from 'react-bootstrap'
const AllUsers = () => {
	const [userData, userDataChange] = useState(null)
	const navigate = useNavigate()
	const [isSignedIn, setIsSignedIn] = useState(false)
	const [user, setUser] = useState('')
	const [allData, setAllData] = useState('')
	const [selectedUser, setSelectedUser] = useState(null)
	const [show, setShow] = useState(false)
	const [points, setPoints] = useState(0)

	const handleClose = () => {
		setShow(false)
		setSelectedUser(null)
		setPoints(0)
	}
	const handleShow = () => {
		setShow(true)
	}


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

	const addPointsUser = (id) => {
		setSelectedUser(id)
		handleShow()
	}
	// const LoadEdit = (_id) => {
	//     navigate(`edit/${_id}`)
	// }
	// const Removefunction = (_id) => {
	//     if (window.confirm('Do you want to Change the Status?')) {
	//         fetch(`${process.env.REACT_APP_BASE_URL}/user/${_id}/activation`, {
	//             method: "PUT"
	//         }).then((res) => {
	//             console.log(res)
	//             alert('Update successfully.')
	//             window.location.reload()
	//         }).catch((err) => {
	//             console.log(err.message)
	//         })
	//     }
	// }

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BASE_URL}/user`)
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

	const handleAddPoints = () => {
		console.log(selectedUser)
		fetch(`${process.env.REACT_APP_BASE_URL}/user/add-points/${selectedUser}`, {
			method: 'POST',
			body: JSON.stringify({
				points: Number(points)
			}),
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('userAuthToken')
			}
		})
			.then(res => {
				return res.json()
			})
			.then(resp => {
				console.log(resp)
				if (resp.user) {
					userDataChange(userData.map(function (user) { return user._id === selectedUser ? resp.user : user }))
				}
				handleClose()
			})
			.catch(err => {
				console.log(err.message)
			})
	}
	return (
		<>
			{user ? (
				<div className="user-container">
					<div className="user-card">
						<div className="card-title">
							<h2 className="m-2">Users</h2>
						</div>
						<div className="table-responsive">
							<table className="table">
								<thead className="primary">
									<tr style={{ textAlign: 'left' }}>
										<th scope="col">First Name</th>
										<th scope="col">Last Name</th>
										<th scope="col">Email</th>
										<th scope="col">Phone</th>
										<th scope="col">Activation</th>
										<th scope="col">Points</th>
										<th scope="col">Action</th>
									</tr>
								</thead>

								<tbody style={{ textAlign: 'left' }}>
									{userData &&
										userData.map(item => (
											<tr key={item._id} >
												<td>{item.firstname}</td>
												<td>{item.lastname}</td>
												<td>{item.email}</td>
												<td>{item.phone}</td>
												<td>{item.status === true ? 'Active' : 'Inactive'}</td>
												<td>{item.profilePoints}</td>
												<td><PlusCircle style={{ marginRight: 10 }} onClick={() => addPointsUser(item._id)} /><Eye onClick={() => LoadDetail(item._id)} /></td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</div>
					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Add points</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<FormControl type="number" placeholder="Enter points" value={points} onChange={(e) => setPoints(e.target.value)} />
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
							<Button variant="primary" onClick={handleAddPoints} disabled={!Number(points)}>
								Save Changes
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
			) : (
				<></>
			)}
		</>
	)
}

export default AllUsers

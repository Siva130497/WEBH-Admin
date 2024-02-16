/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect } from 'react'
// import { Link, useNavigate } from "react-router-dom"
import './AllFeedback.css'
import {
	Button,
	Card,
	CardGroup,
	CardTitle,
	FormGroup,
	Input
} from 'reactstrap'
import { Edit, Delete, Info, PlusCircle } from 'react-feather'

const AllContact = () => {
	const [contactData, contactDataChange] = useState()
	// const navigate = useNavigate()
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

	// const viewHandler = (_id) => {
	//       navigate(`${_id}`)
	// }

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BASE_URL}/contact`)
			.then(res => {
				return res.json()
			})
			.then(resp => {
				contactDataChange(resp)
			})
			.catch(err => {
				console.log(err.message)
			})
	}, [])

	// const Removefunction = (_id) => {
	//   if (window.confirm('Do you want to remove?')) {
	//       fetch(`${ process.env.REACT_APP_BASE_URL }/feedback/${ _id }`, {
	//           method: "DELETE"
	//       }).then((res) => {
	//           console.log(res)
	//           alert('Removed successfully.')
	//           window.location.reload()
	//       }).catch((err) => {
	//           console.log(err.message)
	//       })
	//   }
	// }

	return (
		<>
			{user ? (
				<div className="feedback-container">
					<div className="feedback-card">
						<div className="card-title">
							<h2 className="m-2">All Contacts</h2>
						</div>
						<div className="table-responsive feedback-card-body">
							<table class="table">
								<thead className="primary">
									<tr>
										{/* <th scope="col">#</th> */}
										<th scope="col">Name</th>
										{/* <th scope="col">Last Name</th> */}
										<th scope="col">Email</th>
										{/* <th scope="col">Industry</th> */}
										<th scope="col">Message</th>
									</tr>
								</thead>
								<tbody>
									{contactData &&
										contactData.map(item => (
											<tr key={item._id}>
												{/* <td>{}</td> */}
												<td>{item.name}</td>
												{/* <td>{item.lastName}</td> */}
												<td>{item.email}</td>
												{/* <td>{item.industry}</td> */}
												<td>{item.desc}</td>
												{/* <td></td> */}
												{/* <td>{item.image}</td> */}
												{/* <td>
                                    <a onClick={() => { Removefunction(item._id) }} className="btn btn-danger"><Delete size={12} /><i class="fas fa-trash-alt"></i> </a>  | 
                                    <a onClick={() => { LoadDetail(item._id) }} className="btn btn-info"><Info size={12} /></a>
                                </td> */}
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

export default AllContact

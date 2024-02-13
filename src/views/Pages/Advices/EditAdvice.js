/* eslint-disable no-tabs */
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BsonObjectID from 'bson-objectid'
import {
	Button,
	Card,
	CardTitle,
	Input,
	CardGroup
} from 'reactstrap'

const EditUser = () => {
	const { id } = useParams()

	const isEdit = BsonObjectID.isValid(id)

	const [title, setTitle] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		if (isEdit) {
			fetch(`${process.env.REACT_APP_BASE_URL}/advice/${id}`)
				.then(res => {
					return res.json()
				})
				.then(resp => {
					// idchange(resp.id)
					console.log(resp)
					setTitle(resp.title)
				})
				.catch(err => {
					console.log(err.message)
				})
		}
	}, [])

	useEffect(() => {
		if (!isEdit) {
			fetch(`${process.env.REACT_APP_BASE_URL}/advice`)
				.then(res => {
					return res.json()
				})
				.then(resp => {
					// idchange(resp.id)
					console.log(resp)
					if (resp.length > 3) navigate('/advices')
				})
				.catch(err => {
					console.log(err.message)
				})
		}
	}, [isEdit])
	// const[id,idchange]=useState("")


	const handlesubmit = e => {
		e.preventDefault()
		const payload = { title }
		if (isEdit) {
			fetch(`${process.env.REACT_APP_BASE_URL}/advice/${id}`, {
				method: 'PUT',
				headers: { 'content-type': 'application/json', Authorization: localStorage.getItem('userAuthToken') },
				body: JSON.stringify(payload)
			})
				.then(res => {
					console.log(res)
					alert('Updated successfully.')
					navigate('/advices')
				})
				.catch(err => {
					console.log(err.message)
				})
		} else {
			fetch(`${process.env.REACT_APP_BASE_URL}/advice`, {
				method: 'POST',
				headers: { 'content-type': 'application/json', Authorization: localStorage.getItem('userAuthToken') },
				body: JSON.stringify(payload)
			})
				.then(res => {
					console.log(res)
					alert('Updated successfully.')
					navigate('/advices')
				})
				.catch(err => {
					console.log(err.message)
				})
		}
	}

	const deleteAdvice = () => {
		fetch(`${process.env.REACT_APP_BASE_URL}/advice/${id}`, {
			method: 'DELETE',
			headers: { 'content-type': 'application/json', Authorization: localStorage.getItem('userAuthToken') }
		})
			.then(res => {
				console.log(res)
				alert('Updated successfully.')
				navigate('/advices')
			})
			.catch(err => {
				console.log(err.message)
			})
	}
	return (
		<Card>
			<form onSubmit={handlesubmit} className="m-2">
				<CardGroup className="group">
					<CardTitle style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
						<h3>Title</h3>
						{isEdit &&
							<Button className="btn btn-danger" onClick={deleteAdvice}>
								Delete
							</Button>}
					</CardTitle>
					<Input
						onChange={e => setTitle(e.target.value)}
						value={title}
						type="text"
					/>
				</CardGroup>
				<Button type="submit" className="btn">
					Submit
				</Button>
			</form>
		</Card>
	)
}

export default EditUser

import React from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import avatar from './../../../assets/images/users/notavailable.jpg'
import './SkillItem.css'
const BlogItem = (props) => {

  const navigate = useNavigate()

  const routehandler = () => {
    navigate(`${props.id}`)
  }
  
  return ( 
          <div className="skill_card" onClick={() => routehandler(props.id)}>
            <div className="title">{props.name}</div>
            <div className="image">
            {!props.image && <img src={avatar} alt="" />}
              {props.image && <img src={props.image} alt="" />}
            </div>
          </div>
        )
  
}

export default BlogItem

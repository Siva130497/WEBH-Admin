import React from "react"
import { useNavigate } from "react-router-dom"
import avatar from './../../../assets/images/users/avatar-1.jpg'
import './SkillItem.css'
const PostItem = (props) => {

  const navigate = useNavigate()

  const routehandler = () => {
    navigate(`${props.id}`)
  }
  
  return ( 
          <div className="skill_card" onClick={() => routehandler(props.id)}>
            <div className="title">{props.category}</div>
            <div className="title">{props.name}</div>
            <div className="image">
            {!props.image && <img src={avatar} alt="" />}
              {props.image && <img src={props.image} alt="" />}
            </div>
            <div className="desc">{props.desc}</div>
          </div>
        )
  
}

export default PostItem

/* eslint-disable no-tabs */
import React from "react"
import AdvertisementItem from "./AdvertisementItem"
import './PostManagementList.css'

const AdvertisementList = (props) => {
	return <ul className="postManagementList">
				{props.data.map((item) => (
					<li key={item._id}>
						<AdvertisementItem id={item._id} name={item.name} image={item.image} expiry={item.expiry} desc={item.desc} />
					</li>
				))}
			</ul>
		
}

export default AdvertisementList     

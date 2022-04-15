import React from 'react';
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Rating } from "@material-ui/lab"



const DesignerCard = ({ designer }) => {
 
  // const options = {
  //   edit:false,
  //   color: "rgba(20,20,20,0.1",
  //   activeColor: "tomato",
  //   size: window.innerWidth < 600 ? 20 : 25,
  //   value: designer.ratings,
  //   isHalf:true,
  // }

  const options = {

    readOnly:true,
    precision: 0.5,
    value: designer.ratings,
  };


  return (
    <Link className='designerCard' to = {`/designer/${designer._id}`}>
        <img src={designer.images[0].url} alt={designer.name} height="50%"></img>
        <span>Name: { designer.name }</span>
        <div>
            <Rating {...options}/> 
            <span> ({ designer.numOfReviews })</span>
        </div>  
        <span>specialization : { designer.specialization }</span>  
        <span>Experience : { designer.experience } years</span>
    </Link>
  )
}

export default DesignerCard;
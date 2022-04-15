import React from 'react';
import ReactStars from "react-rating-stars-component";
import profilePng from "../../images/Profile.png";
import { Rating } from "@material-ui/lab";

const ReviewCard = ({ review }) => {

    const options = {

        readOnly:true,
        precision: 0.5,
        value: review.rating,
        
      };

  return (
    <div className='reviewCard'>
        <img src={profilePng} alt="User" />
        <p>{review.name}</p>
        <Rating {...options} />
        <span className='reviewCardComment'>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
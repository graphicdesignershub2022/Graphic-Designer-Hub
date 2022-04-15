import React, { Fragment, useEffect, useState } from 'react';
import "./DesignerDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getDesignerDetails, newReview } from "../../actions/designerAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/designerConstants";


const DesignerDetails = ({match}) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const {designer,loading,error} = useSelector(
      (state) => state.designerDetails);

      const { success, error: reviewError } = useSelector(
        (state) => state.newReview
      );

    useEffect( () => {
      if(error){
        alert.error("error");
        dispatch(clearErrors());
      }

      if (reviewError) {
        alert.error(reviewError);
        dispatch(clearErrors());
      }
      if (success) {
        alert.success("Review Submitted Successfully");
        dispatch({ type: NEW_REVIEW_RESET });
      }

        dispatch(getDesignerDetails(match.params.id));
    }, [dispatch,match.params.id,error,alert, reviewError,success]);


    const options = {
      size: "large",
      value: designer.ratings,
      readOnly:true,
      precision: 0.5,
    }

 
    const [open, setOpen ] = useState(false);
    const [ rating, setRating ] = useState(0);
    const [comment, setComment] = useState("");

    const submitReviewToggle = () => {
      open ? setOpen(false) : setOpen(true);
    };


    const reviewSubmitHandler = () => {
      const myForm = new FormData();
  
      myForm.set("rating", rating);
      myForm.set("comment", comment);
      myForm.set("designerId", match.params.id);
  
      dispatch(newReview(myForm));
  
      setOpen(false);
    };



  return (
    <Fragment>
      {loading ? ( <Loader /> ) : (
        <Fragment>
          <MetaData title={`${designer.name} --GRAPHIC DESIGNERS HUB`} />
        <div className="DesignerDetails">
            <div>
                {designer.images &&
                  designer.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
            </div>

            <div>
              
              <div className="detailsBlock-1">
                <h2>{designer.name}</h2>
                <p>Designer # {designer._id}</p>
              </div>
              
              <div className='detailsBlock-2'>
                Skills : <h3>{designer.skills}</h3>
              </div>

              <div className='detailsBlock-3'>
                Qualification : <h3>{designer.qualification}</h3>
              </div>

              <div className='detailsBlock-3-1'>
                Experience : <h3>{ designer.experience }</h3>
              </div>

              <div className='detailsBlock-3-1'>
                specialization : <h3> { designer.specialization }</h3>
              </div>

              <div className='detailsBlock-4'>
                <Rating {...options} />
                <span> ({designer.numOfReviews} Reviews) </span>
              </div>


              <div className='detailsBlock-4-1'>
              <button className="placeorder">Place Order</button>
              </div>

              <button className="submitReview" onClick={submitReviewToggle}>Submit Review</button>
            </div>
        </div>

                    {/* Reviews display */}
        <h3 className='reviewsHeading'>REVIEWS</h3>

        <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

        { designer.reviews && designer.reviews[0] ? (
          <div className='reviews'>
            {designer.reviews && designer.reviews.map((review) => <ReviewCard key={review._id} review={review} />)}
          </div>
        ) : (
          <p className='noReviews'> No Reviews Yet</p>
        )}
    </Fragment>
      )}
    </Fragment>
  );
};

export default DesignerDetails;
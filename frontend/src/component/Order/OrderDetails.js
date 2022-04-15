import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const OrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Order Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Company Name:</p>
                  <span>
                    {order.companyName && order.companyName}
                  </span>
                </div>
                <div>
                  <p>Order Description:</p>
                  <span>
                  {order.orderDescription}
                  </span>
                </div>
              </div>
              <Typography>Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.orderStatus === "accepted"
                        ? "greenColor"
                        : "redColor"
                    }
                  />
                </div>
              <Typography>Order Type</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                    {order.orderType}
                </div>
              </div>
            </div>
          </div>
        </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;

import {
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    CLEAR_ERRORS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
  } from "../constants/orderConstants";
import axios from "axios";

  // My Orders
export const myOrders = () => async (dispatch) => {
    try {
      dispatch({ type: MY_ORDERS_REQUEST });
  
      const { data } = await axios.get("/api/v1/orders/me");
  
      dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
      dispatch({
        type: MY_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  export const clearErrors = ()=> async (dispatch)=>{
    dispatch({
        type: CLEAR_ERRORS
    });
};



//get order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/order/${id}`);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
  
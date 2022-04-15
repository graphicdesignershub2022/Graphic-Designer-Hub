import axios from "axios";

import {ALL_DESIGNER_FAIL,
    ALL_DESIGNER_REQUEST,
    ALL_DESIGNER_SUCCESS,
    DESIGNER_DETAILS_REQUEST,
    DESIGNER_DETAILS_SUCCESS,
    DESIGNER_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    DESIGNER_LOGIN_REQUEST,
    DESIGNER_LOGIN_SUCCESS,
    DESIGNER_LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_DESIGNER_REQUEST,
    REGISTER_DESIGNER_SUCCESS,
    REGISTER_DESIGNER_FAIL,
    ADMIN_DESIGNER_REQUEST,
    ADMIN_DESIGNER_SUCCESS,
    ADMIN_DESIGNER_FAIL,
} from "../constants/designerConstants";

//get Designer
export const getDesigner = (keyword="", currentPage=1, experience=[0,25], category, ratings=0 ) => 
async (dispatch)=>{

    try {

        dispatch({ type : ALL_DESIGNER_REQUEST });

        let link = `/api/v1/designers?keyword=${keyword}&page=${currentPage}&experience[gte]=${experience[0]}&experience[lte]=${experience[1]}&ratings[gte]=${ratings}`;
        
        if(category){
            link = 
            `/api/v1/designers?keyword=${keyword}&page=${currentPage}&experience[gte]=${experience[0]}&experience[lte]=${experience[1]}
            &category=${category}&ratings[gte]=${ratings}`;
        }
        const {data} = await axios.get(link);

        dispatch({
            type : ALL_DESIGNER_SUCCESS,
            payload :  data,

        })
        
    } catch (error) {
        dispatch({
            type : ALL_DESIGNER_FAIL,
            payload : error.response.data.message,
        });
    }
};


// Get All Designers For Admin
export const getAdminDesigner = () => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_DESIGNER_REQUEST });
  
      const { data } = await axios.get("/api/v1/admin/designers");
  
      dispatch({
        type: ADMIN_DESIGNER_SUCCESS,
        payload: data.designers,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_DESIGNER_FAIL,
        payload: error.response.data.message,
      });
    }
  };



//Login
export const dlogin = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: DESIGNER_LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json"} };

        const { data } = await axios.post(
            `/api/v1/designer/login`,
            { email, password },
            config
        );

        dispatch({ type: DESIGNER_LOGIN_SUCCESS, payload: data.designer });

    } catch (error) {
        dispatch({type: DESIGNER_LOGIN_FAIL, payload: error.response.data.message });
    }
};


//REGISTER NEW DESIGNER
export const registerDesigner = (designerData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_DESIGNER_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`/api/v1/designer/register`, designerData, config);

        dispatch({ type: REGISTER_DESIGNER_SUCCESS, payload: data.designer });

    } catch (error) {
        dispatch({
            type: REGISTER_DESIGNER_FAIL,
            payload: error.response.data.message,
        });
    }
};



//get designer details
export const getDesignerDetails = (id) => async (dispatch) => {

    try {

        dispatch({ type: DESIGNER_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/designer/${id}`);

        dispatch({
            type : DESIGNER_DETAILS_SUCCESS,
            payload :  data.designer,

        });
        
    } catch (error) {
        dispatch({
            type : DESIGNER_DETAILS_FAIL,
            payload : error.response.data.message,
        });
    }
};




// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(`/api/v1/review`, reviewData,config);
  
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };



//   //LOAD DESIGNER
//   export const loadDesigner  = () => async (dispatch) => {
//     try {
//         dispatch({ type: LOAD_DESIGNER_REQUEST });

//         const { data } = await axios.get(`/api/v1/dme`);

//         dispatch({ type: LOAD_DESIGNER_SUCCESS, payload: data.designer });

//     } catch (error) {
//         dispatch({type: LOAD_DESIGNER_FAIL, payload: error.response.data.message });
//     }
// };



//LOGOUT DESIGNER
// export const logout  = () => async (dispatch) => {
//     try {

//         await axios.get(`/api/v1/logout`);

//         dispatch({ type: LOGOUT_SUCCESS });

//     } catch (error) {
//         dispatch({type: LOGOUT_FAIL, payload: error.response.data.message });
//     }
// };





//clearing Errors
export const clearErrors = ()=> async (dispatch)=>{
    dispatch({
        type: CLEAR_ERRORS
    });
};
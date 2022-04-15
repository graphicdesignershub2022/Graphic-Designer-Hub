import React, { Fragment, useEffect } from "react"
import "./Home.css"
import Designer from "./DesignerCard.js"
import MetaData from "../layout/MetaData";
import {clearErrors, getDesigner} from "../../actions/designerAction";
import {useSelector,useDispatch} from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { designers, loading, error} = useSelector(
    (state) =>state.designers
  );


  useEffect(() =>{

    if(error){
      alert.error("error");
      dispatch(clearErrors());
    }
    dispatch(getDesigner());
  },[dispatch, error, alert]);


  return (
    <Fragment>
      { loading ? 
      (<Loader />) : (
        <>

        <MetaData title="Graphic Designer Hub"></MetaData>
  
  
  
        <div className="banner">
          <h1>Welcome to GRAPHIC DESIGNERS HUB</h1>
         <p> <h3>FIND YOUR DREAM DESIGNER</h3></p>
          <a  href= "#container">
          <button>
                  Scroll 
                </button>
                </a>
          </div>
  
          <h2 className="homeheading" 
          style={{textAlign:"center", color: "rgba(0, 0, 0, 0.678)", textDecoration : "underline"}}>Featured Designer</h2>
          
          <div className="container" id="container">
              
              {designers && designers.map(designer => (
                <Designer designer = {designer} />
              ))}
              
          </div>
        
      </>
      )}
    </Fragment>
  )
  
}

export default Home;

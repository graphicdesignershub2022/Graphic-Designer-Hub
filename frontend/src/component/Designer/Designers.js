import React, { useEffect, useState } from 'react';
import "./Designers.css";
import { useSelector, useDispatch } from "react-redux";
import {clearErrors, getDesigner} from "../../actions/designerAction";
import Loader from "../layout/Loader/Loader";
import DesignerCard from '../Home/DesignerCard';
import { Fragment } from 'react';
import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";
import { Slider } from "@material-ui/core";
import { useAlert } from 'react-alert';
import MetaData from "../layout/MetaData";


//category
const categories = [
  "LogoDesign",
  "Typography",
  "Banner",
  "GraphicDesigner",
  "FashionDesigner",
  "GameDesigner",
  "LandScapeArchitecture"
];


// match and keyword is used for search 
const Designer = ({ match }) => {

  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1); //pages
  const [experience,  setExperience] = useState([0, 25]); //filter
  const [category, setCategory] = useState("");  //category
  const [ratings, setRatings] = useState(0)
  
  const { 
    designers, 
    loading, 
    error, 
    resultPerPage, 
    designerCount, 
    filteredDesignersCount } = useSelector(state => state.designers);


  const keyword = match.params.keyword; //search keyword

  const setCurrentPageNo = (e)=> {
    setCurrentPage(e);
  };

  const experienceHandler = (event, newExperience) => {
    setExperience(newExperience);
  };

  useEffect (() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getDesigner(keyword, currentPage, experience, category, ratings));
  }, [dispatch, keyword, currentPage, experience, category, ratings, alert, error]);


  let count = filteredDesignersCount;

  return ( 
  <Fragment>
    {loading ? (<Loader /> ) : ( 
      <Fragment>
        <MetaData title="DESIGNERS -- GRAPHIC DESIGNERS HUB" />
        <h2 className="designersHeading">Designers</h2>

        <div className="designers">
          {designers && designers.map((designer) => (
            <DesignerCard key={designer._id} designer={designer} />
          ))}
        </div>

          
        {/* FILTER */}
        <div className='filterBox'>
            <Typography>Experience</Typography>
            <Slider 
               value={experience}
               onChange={experienceHandler}
               valueLabelDisplay="auto"
               aria-labelledby="range-slider"
               min={0}
               max={25}
            />

            <Typography>Categories</Typography>
              <ul className='categoryBox'>
                {categories.map((category) => (
                  <li 
                    className='category-link'
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>  
                ))}
              </ul>

                  {/* Ratings Filter */}
              <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }} 
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay='auto'
                  min={0}
                  max={5}
                />
              </fieldset>
        </div>


        {/* Pagination */}
        {
          resultPerPage < count && (
            <div className='paginationBox'>
              <Pagination activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={designerCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                lastPageText="Last"
                firstPageText="1st"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
          </div>
          )
        }

      </Fragment> 
    )}
  </Fragment>
  );
};

export default Designer;
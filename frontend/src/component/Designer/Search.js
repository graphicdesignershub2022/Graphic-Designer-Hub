import React, { useState } from 'react'
import { Fragment } from 'react';
import "./Search.css";
import MetaData from "../layout/MetaData";

const Search = ({ history }) => {
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if( keyword.trim() ) {
            history.push(`/designers/${keyword}`);
        }
        else{
            history.push("/designers");
        }
    };

  return (
    <Fragment>
        <MetaData title={"Search A Designer --GRAPHIC DESIGNERS HUB"} />
        <form className='searchBox' onSubmit={searchSubmitHandler}>
            <input type="text" 
             placeholder='Search a designer    ex:-Logo Design , Banner.' 
             onChange={(e) => setKeyword(e.target.value)} 
            /> 
            <input type="submit" value="Search" />
        </form>
    </Fragment>
  )
}

export default Search
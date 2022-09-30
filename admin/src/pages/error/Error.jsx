import React from 'react';
import { Link } from 'react-router-dom';
import "./error.css";

const Error = () => {

  return (
    <div className='errorPage'>
        <h1 className="errorTitle">This page does not exist</h1>
        <Link to="/login">
            <button className="errorButton">Go Back</button>
        </Link>
        
    </div>
  )
}

export default Error
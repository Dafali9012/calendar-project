import React from "react";
import { Link } from "react-router-dom";


export default function Header(){

  return(
    <header className="header-of-page">
        <div className="col-3 nav-menu">
            <Link to="/"><h3 className="link">Calendar</h3></Link>
        </div>
        <div className="header-user col-3">
            <Link to="/login"><h4 className="link">Login</h4></Link>
            <Link to="/register"><h4 className="user-btn">Register</h4></Link>
        </div>
    </header>
  );
}
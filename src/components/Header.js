import React from "react";
import { Link } from "react-router-dom";


export default function Header(){
  return(
    <div className="header">
        <Link to="/login"><h2 className="link">Login</h2></Link>
      <div className="path">
        <Link to="/"><h2 className="link">Calendar</h2></Link>
      </div>
    </div>
  )
}
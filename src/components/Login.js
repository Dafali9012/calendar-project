import React from "react";
import { Link } from "react-router-dom";

export default function Login(){

    return (
    <div className="loginCard d-flex justify-content-center">
    <form>

        <div className="text-left mt-4">
            <label htmlFor="emailInput">Email address</label>
            <input type="email" 
               className="form-control" 
               id="email"  
               placeholder="Enter email"
            />
        </div>

        <div className="text-left mt-4">
            <label htmlFor="passwordInput">Password</label>
            <input type="password" 
                className="form-control" 
                id="password" 
                placeholder="Your password"
            />
        </div>

        <button 
            type="submit" 
            className="btn btn-primary mt-5">
            Login
        </button>

        <div className="redirect mt-2">
        <Link to="/Register"><label className="link">Create account</label></Link>
      </div>
    </form>
</div>
);
}
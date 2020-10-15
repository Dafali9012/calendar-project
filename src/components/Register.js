import React from "react";
export default function Register(){

    return (
    <div className="registerCard d-flex justify-content-center">
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

        <div className="text-left mt-4">
            <label htmlFor="exampleInputPassword1">Confirm Password</label>
            <input type="password" 
                className="form-control" 
                id="confirmPassword" 
                placeholder="Confirm Password"
            />
        </div>

        <button 
            type="submit" 
            className="btn btn-primary mt-5">
            Register
        </button>
    </form>
</div>
);
}
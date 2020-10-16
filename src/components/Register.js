import React, {useState} from "react";
//import {useAlert} from "react-alert";

export default function Register(){

    const [state, setState] = useState({email: '', password: ''})
    const handleChange = (e) => {
        const{id, value} = e.target 
        setState(prevState => ({...prevState, [id]: value}))
    }

    const submitClick = (e) => {

        if(state.password === state.confirmPassword){//skickaSkitTillServer()
        } 
        else{//error message
        }
    }

    return (
    <div className="registerCard d-flex justify-content-center">
    <form>

        <div className="text-left mt-4">
            <label htmlFor="emailInput">Email address</label>
            <input type="email" 
               className="form-control" 
               id="email"  
               placeholder="Enter email"
               value={state.email}
               onChange={handleChange}
            />
        </div>

        <div className="text-left mt-4">
            <label htmlFor="passwordInput">Password</label>
            <input type="password" 
                className="form-control" 
                id="password" 
                placeholder="Your password"
                value={state.password}
                onChange={handleChange}
            />
        </div>

        <div className="text-left mt-4">
            <label htmlFor="passwordInput">Confirm Password</label>
            <input type="password" 
                className="form-control" 
                id="confirmPassword" 
                placeholder="Confirm Password"
            />
        </div>

        <button 
            onClick={submitClick}
            type="submit" 
            className="btn btn-primary mt-5">
            Register
        </button>
    </form>
</div>
);
}
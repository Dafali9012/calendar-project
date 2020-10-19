import React, {useState} from "react";
import { Link } from "react-router-dom";

export default function Login() {
    //this.app = app;

    //create state & update values after entering in input
    const [state, setState] = useState({email: '', password: ''})
    const updateValues = (e) => {
        const{id, value} = e.target 
        setState(prevState => ({...prevState, [id]: value}))
    }

    //when clicking button
    const submitClick = () => {
        //if email/password entered -> post these
        if((state.email && state.password) !== null) {
            const details = { "email":state.email, "password":state.password}
            this.app.post('/api/login', details)
            // ---> help <---
            
            //redirect to home
            this.props.history.push('/')
        } 
        else {
            //error message -> enter valid username/password
        }
    }

  return (
    <div className="loginCard d-flex justify-content-center">
      <form>
        <div className="text-left mt-4">
          <label htmlFor="emailInput">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={state.email}
            onChange={updateValues}
          />
        </div>

        <div className="text-left mt-4">
          <label htmlFor="passwordInput">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Your password"
            value={state.password}
            onChange={updateValues}
          />
        </div>

        <button 
            onClick={submitClick}
            type="submit" 
            className="btn btn-primary mt-5">
          Login
        </button>

        <div className="redirect mt-2">
          <Link to="/Register">
            <label className="link">Create account</label>
          </Link>
        </div>
      </form>
    </div>
  );
}

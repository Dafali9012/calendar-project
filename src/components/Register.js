import React, {useState} from "react";

export default function Register(){
    //this.app = app;

    //create state & update values after entering in input
    const [state, setState] = useState({email: '', password: '', passwordConfirm: ''})
    const updateValues = (e) => {
        const{id, value} = e.target 
        setState(prevState => ({...prevState, [id]: value}))
    }

    //when clicking button
    const submitClick = () => {
        //if passwords match -> registerUser();
        if(state.password === state.passwordConfirm){registerUser();
        } 
        else{
            //error message -> password doesn't match
        }
    }


    const registerUser = () => {
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
    <div className="registerCard d-flex justify-content-center user-select-none">
    <form>

        <div className = "form-group text-left mt-4">
            <label 
                className="form-label" 
                htmlFor = "email">
                Email adress
            </label>
            <input 
                type = "email" 
                className = "form-input" 
                id = "email"  
                placeholder = "dan@domain.com"
                value = {state.email}
                onChange = {updateValues}
            />
        </div>

        <div className = "form-group text-left mt-4">
            <label 
                className="form-label" 
                htmlFor = "password">
                Password
            </label>
            <input 
                type = "password" 
                className = "form-input" 
                id = "password" 
                placeholder = "•••••"
                value = {state.password}
                onChange = {updateValues}
            />
        </div>

        <div className = "form-group text-left mt-4">
            <label 
                className="form-label" 
                htmlFor = "passwordConfirm">
                Confirm password
            </label>
            <input 
                type = "password" 
                className = "form-input" 
                id = "passwordConfirm" 
                placeholder = "•••••"
                value = {state.passwordConfirm}
                onChange = {updateValues}
            />
        </div>

        <button 
            onClick={submitClick}
            type="submit" 
            className="btn btn-primary submit mt-5">
            Register
        </button>
    </form>
</div>
);
}
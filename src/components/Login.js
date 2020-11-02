import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
import { UserContext } from "../Store";
import { Redirect } from "react-router-dom";

export default function Login(props) {
  const [redirect, setRedirect] = useState({path:null});
  // eslint-disable-next-line
  const [user,setUser] = useContext(UserContext);
  //create state & update values after entering in input
  const [state, setState] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);
  const updateValues = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({ ...prevState, [id]: value }));
  };

  if(redirect.path!=null) return <Redirect push to={redirect.path}/>;
  if(user!=null) setRedirect({path:"/"});

  async function login(e) {
    e.preventDefault();

    if ((state.email && state.password) !== null) {
      const details = { email: state.email, password: state.password };

      let login = await (
        await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify(details),
          headers: { "Content-Type": "application/json" },
        })
      ).json();

      if (login.error) {
        setState({ email: "", password: ""});
        setUser(null);
        setShowAlert(true);
      } else {
        setUser(login);
        setState({ email: "", password: ""});
      }
    }
  }

  const clearFields = () => {
    setState({ email: "", password: ""});
  }

  return (
    <div className="pt-4">
      <div className="loginCard d-flex justify-content-center user-select-none">
        <form>
          <div className="form-group text-left mt-4">
            <label className="form-label" htmlFor="email">
              Email adress
            </label>
            <input
              type="email"
              className="form-input"
              id="email"
              placeholder="dan@domain.com"
              value={state.email}
              onChange={updateValues}
            />
          </div>

          <div className="form-group text-left mt-4">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="form-input"
              id="password"
              placeholder="•••••"
              value={state.password}
              onChange={updateValues}
            />
          </div>

          <button
            onClick={login}
            type="submit"
            className="btn btn-primary w-100 mt-5"
          >
            Login
          </button>

          <button
            onClick={()=>setRedirect({path:"/register"})}
            type="button"
            className="col-5 btn btn-primary btn-sm mt-3"
          >
            <small>Register</small>
          </button>

          <button
            onClick={clearFields}
            type="button"
            className="col-5 btn btn-primary btn-sm mt-3 float-right"
          >
            <small>CLEAR</small>
          </button>

          <div className="redirect mt-2">
            <Link to="/Register">
              <label className="link">Create account</label>
            </Link>
          </div>
        </form>
      </div>
      <Alert
        color="danger"
        className=""
        isOpen={showAlert}
        toggle={() => setShowAlert(false)}
      >
        <p>Make sure to enter correct details. User does not exist</p>
      </Alert>
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";

export default function Login(props) {
  //this.app = app;

  //create state & update values after entering in input
  const [state, setState] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);
  const updateValues = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({ ...prevState, [id]: value }));
  };

  //when clicking button
  const submitClick = (e) => {
    e.preventDefault();
    //if email/password entered -> post these
    if ((state.email && state.password) !== null) {
      const details = { email: state.email, password: state.password };
      this.app.post("/api/login", details);
      // ---> help <---

      //redirect to home
      redirectHome();
    } else {
      setShowAlert(true);
    }
  };
  const redirectHome = () => {
    props.history.push("/");
  };

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
            onClick={submitClick}
            type="submit"
            className="btn btn-primary submit mt-5"
          >
            Login
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

import React, { useState } from "react";
import { Alert } from "reactstrap";

export default function Register(props) {
  //this.app = app;
  //create state & update values after entering in input
  const [state, setState] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
  });
  const updateValues = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({ ...prevState, [id]: value }));
  };
  const [showAlert, setShowAlert] = useState(false);

  const submitClick = (e) => {
    e.preventDefault();
    //if passwords match -> registerUser();
    if (state.password === state.passwordConfirm) {
      if (
        state.name.length &&
        state.email.length &&
        state.passwordConfirm.length
      ) {
        registerNewUser(e);
      } else {
        setShowAlert(true);
        setState({ name: "", email: "", password: "", passwordConfirm: ""});
      }
    } else {
      setShowAlert(true);
      setState({password: "", passwordConfirm: ""});
    }
  };

  async function registerNewUser(e) {
    e.preventDefault();
    delete state.passwordConfirm;
    let add = await (
      await fetch("/api/users/", {
        method: "POST",
        body: JSON.stringify(state),
        headers: { "Content-Type": "application/json" },
      })
    ).json();
    if (add.error) {
      setShowAlert(true);
    } else {
      setState({ name: "", email: "", password: "", passwordConfirm: ""});
      redirectHome();
    }
  }

  const clearFields = () => {
    setState({ name: "", email: "", password: "", passwordConfirm: ""});
    return;
  }

  const redirectLogin = () => {
    props.history.push("/login");
  }
  
  const redirectHome = () => {
    props.history.push("/");
  };

  return (
    <div className="pt-4">
      <div className="registerCard d-flex justify-content-center user-select-none">
        <form>
          <div className="form-group text-left mt-4">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              className="form-input"
              id="name"
              placeholder="Dan Smith"
              value={state.name}
              onChange={updateValues}
            />
          </div>

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

          <div className="form-group text-left mt-4">
            <label className="form-label" htmlFor="passwordConfirm">
              Confirm password
            </label>
            <input
              type="password"
              className="form-input"
              id="passwordConfirm"
              placeholder="•••••"
              value={state.passwordConfirm}
              onChange={updateValues}
            />
          </div>

          <button
            onClick={submitClick}
            type="submit"
            className="btn btn-primary w-100 mt-5"
          >
            Register
          </button>

          <button
            onClick={redirectLogin}
            type="login"
            className="btn btn-primary login mt-1 p-0"
          >
            Already a User
          </button>

          <button
            onClick={clearFields}
            type="clear"
            className="btn btn-primary login float-right mt-1 p-0">
              Clear
          </button>
        </form>
      </div>
      <Alert
        color="danger"
        className="my-5 text-center"
        isOpen={showAlert}
        toggle={() => setShowAlert(false)}
      >
        <p>Something went wrong while registering your profile</p>
        <hr />
        <p className="mb-0">
          Make sure to enter matching passwords/unused email
        </p>
      </Alert>
    </div>
  );
}

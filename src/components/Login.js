import React, { useState, useContext } from "react";
import { Alert } from "reactstrap";
import { UserContext, EventListContext, InviteContext } from "../Store";
import { Redirect } from "react-router-dom";

export default function Login(props) {
  const [redirect, setRedirect] = useState({path:null});
  // eslint-disable-next-line
  const [user,setUser] = useContext(UserContext);
  // eslint-disable-next-line
  const [inviteList, setInviteList] = useContext(InviteContext);
  // eslint-disable-next-line
  const [eventList, setEventList] = useContext(EventListContext);
  //create state & update values after entering in input
  const [state, setState] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);
  const updateValues = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({ ...prevState, [id]: value }));
  };

  if(redirect.path!=null) return <Redirect push to={redirect.path}/>;
  if(user!==null) setRedirect({path:"/"});

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
        updateEvents(login.id);
        setState({ email: "", password: ""});
      }
    }
  }

  async function updateEvents(id) {
    console.log("updating events from login")
    let result = await(await fetch("/api/event/user/"+id)).json();
    if(!result.error) {
      console.log(result);
      setEventList(result.events);
      setInviteList(result.invites);
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

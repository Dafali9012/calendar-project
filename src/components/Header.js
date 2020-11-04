import React, { useContext } from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from "react-router-dom";
import { UserContext } from "../Store";

export default function Header() {
  const [user, setUser] = useContext(UserContext);

  function logout() {
    return (
      <Link className="text-decoration-none" to="/">
        <h5 onClick={deleteSession} className="link">Log me out</h5>
      </Link>
    );
  }

  async function deleteSession() {
    let result = await (
      await fetch("/api/login", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
    ).json();
    setUser(null)
    console.log(result)
  }

  function login() {
    return (
      <Link className="text-decoration-none" to="/login">
        <h4 className="link">Login</h4>
      </Link>
    );
  }

  function register() {
    return (
      <Link className="text-decoration-none" to="/register">
        <h4 className="user-btn">Register</h4>
      </Link>
    );
  }
  let notifications = 2;

  return (
    <header className="header-of-page">
      <div className="col-3 nav-menu">
        <Link className="text-decoration-none" to="/">
          <h1 className="link logo pl-5"><strong>iCalendar</strong></h1>
        </Link>
      </div>

      <div className="header-user col-3">

      <UncontrolledDropdown>
        <DropdownToggle>
        <div className="row">
        <div className="col my-auto">{user == null ? <h4 className="button-title userName">Menu</h4> : <h5 className="userName"><span role="img" aria-label="user"></span>{user.name}</h5>}</div>
        <div className="col my-auto pl-0">{notifications>0?<div className="event-marker text-light my-0">{notifications>9?"9+":notifications}</div>:null}</div>
        </div>
        </DropdownToggle>
        <DropdownMenu className="drop">
          <DropdownItem header>{user == null ? 'I want to: ' : user.email}</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>{user == null ? login() : 'events here?'}</DropdownItem>
          <DropdownItem>{user == null ? register() : '/path here?'}</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>{user == null ? '' : logout()}</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      </div>
      
    </header>
  );
}
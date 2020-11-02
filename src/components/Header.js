import React, { useContext } from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from "react-router-dom";
import { UserContext } from "../Store";

export default function Header() {
  const [user, setUser] = useContext(UserContext);

  function logout() {
    return (
      <Link to="/">
        <h4 onClick={deleteSession} className="link">Logout</h4>
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
      <Link to="/login">
        <h4 className="link">Login</h4>
      </Link>
    );
  }

  function register() {
    return (
      <Link to="/register">
        <h4 className="user-btn">Register</h4>
      </Link>
    );
  }

  return (
    <header className="header-of-page">
      <div className="col-3 nav-menu">
        <Link to="/">
          <h1 className="link"><strong>Calendar</strong></h1>
        </Link>
      </div>

      <div className="header-user col-3">

      <UncontrolledDropdown>
        <DropdownToggle>
        {user == null ? <h4>Menu</h4> : <h4>{user.name}</h4>}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>{user == null ? 'I want to' : user.email}</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>{user == null ? login() : ''}</DropdownItem>
          <DropdownItem>{user == null ? register() : ''}</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>{user == null ? '' : logout()}</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      </div>
      
    </header>
  );
}

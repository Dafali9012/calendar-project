import React, { useContext } from "react";
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
          <h3 className="link">Calendar</h3>
        </Link>
      </div>
      <div className="header-user col-3">
        {user == null ? register() : <h4>{user.name}</h4>}
        {user == null ? login() : logout()}
      </div>
    </header>
  );
}

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Store";

export default function Header() {
  const [user, setUser] = useContext(UserContext);
  console.log(user);
  return (
    <header className="header-of-page">
      <div className="col-3 nav-menu">
        <Link to="/">
          <h3 className="link">Calendar</h3>
        </Link>
        {user == null ? <p>Not user</p> : <p>{"email: ", user.email}</p>}
      </div>
      <div className="header-user col-3">
        <Link to="/login">
          <h4 className="link">Login</h4>
        </Link>

        <Link to="/register">
          <h4 className="user-btn">Register</h4>
        </Link>
      </div>
    </header>
  );
}

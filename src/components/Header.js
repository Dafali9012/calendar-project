import React, { useContext , useState} from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link , Redirect, useLocation} from "react-router-dom";
import { UserContext, InviteContext } from "../Store";

export default function Header() {
  const [user, setUser] = useContext(UserContext);
  //eslint-disable-next-line
  const [notifications, setNotifications] = useContext(InviteContext);
  const [redirect, setRedirect] = useState({pathname:null});

  let loc = useLocation();
  if(redirect.pathname!=null && loc !== redirect.pathname) return <Redirect to={redirect}/>


  function logout() {
    return (
      <Link className="text-decoration-none" to="/">
        <h5 onClick={deleteSession} className="link">
          Log me out
        </h5>
      </Link>
    );
  }

  async function deleteSession() {
    await (
      await fetch("/api/login", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
    ).json();
    setUser(null);
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

  function dropIt() {
    return (
      <div className="header-user col-md-3 col-6">
        <UncontrolledDropdown>
          <DropdownToggle>
            <div className="row">
              <div className="col-md col-6 my-auto">
                {user == null ? (
                  <h4 className="button-title userName">Menu</h4>
                ) : (
                    <h5 className="userName">
                      <span role="img" aria-label="user"></span>
                      {user.name}
                    </h5>
                  )}
              </div>
              {user != null ? (
                <div className="col-md col-6 my-auto pl-md-0 d-flex justify-content-center">
                  {notifications.length > 0 ? (
                    <div className="event-marker text-light my-0">
                      {notifications.length > 9 ? "9+" : notifications.length}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </DropdownToggle>
          <DropdownMenu className="drop">
            <DropdownItem header>
              {user == null ? "I want to: " : user.email}
            </DropdownItem>

            {notifications.map((notif) => {
              return (
                <DropdownItem
                key={notif.id}
                onClick={() => setRedirect({pathname:"/event", state:{event:notif}})}
                >
                  {notif.title}
                  <DropdownItem divider />
                </DropdownItem>
              );
            })}
            <DropdownItem>{user == null ? login() : 'events here?'}</DropdownItem>
            <DropdownItem>{user == null ? register() : '/path here?'}</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>{user == null ? "" : logout()}</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  }

  return (
    <header className="header-of-page">
      <div className="col-md-3 col-4 nav-menu">
        <Link className="text-decoration-none" to="/">
          <h1 className="link logo pl-5">
            <strong>iCalendar</strong>
          </h1>
        </Link>
      </div>
      {user == null ? "" : dropIt()}
    </header>
  );
}

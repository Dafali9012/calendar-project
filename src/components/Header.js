import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { UserContext, InviteContext } from "../Store";

export default function Header(props) {
  const [user, setUser] = useContext(UserContext);
  //eslint-disable-next-line
  const [notifications, setNotifications] = useContext(InviteContext);

  function logout() {
    return (
      <div className="text-decoration-none unselectable" style={{cursor:"pointer"}} onClick={deleteSession}>
        <h5 className="link">
          Log me out
        </h5>
      </div>
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
                <DropdownItem onClick={()=>props.redirectCallback({pathname:"/event", state:{event:notif}})}>
                  {notif.title}
                  <DropdownItem divider />
                </DropdownItem>
              );
            })}
            <DropdownItem divider />
            <DropdownItem>{user == null ? "" : logout()}</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  }

  return (
    <header className="header-of-page">
      <div className="col-md-3 col-5 nav-menu pl-2">
        <div className="text-decoration-none unselectable" style={{cursor:"pointer"}} onClick={()=>props.redirectCallback({pathname:"/"})}>
          <h1 className="link logo">
            <FontAwesomeIcon icon={faApple}/>iCalendar
          </h1>
        </div>
      </div>
      {user == null ? "" : dropIt()}
    </header>
  );
}

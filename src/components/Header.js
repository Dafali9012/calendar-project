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
      <div className="header-user">
        <UncontrolledDropdown>
          <DropdownToggle className="d-flex flex-row">
              <div className="d-flex justify-content-center align-items-center">
                <h5 className="userName text-center mb-0">
                  {user.name}
                </h5>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                {notifications.length > 0 ?
                <div className="event-marker text-light ml-2">
                  {notifications.length > 9 ? "9+" : notifications.length}
                </div>
                : null}
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
    <header className="d-flex flex-row justify-content-around align-items-center bg-primary text-light py-2">
      <h2 className="d-flex flex-row mar-0 align-items-center text-center unselectable" style={{cursor:"pointer"}} onClick={()=>props.redirectCallback({pathname:"/"})}>
        <FontAwesomeIcon icon={faApple}/><p className="mar-0 ml-mb-3">iCalendar</p>
      </h2>
      {user == null ? "" : dropIt()}
    </header>
  );
}

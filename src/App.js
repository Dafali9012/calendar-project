import React, { useContext, useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { UserContext, EventListContext, InviteContext} from "./Store";
import { Redirect } from 'react-router-dom';
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateEvent from "./components/CreateEvent";
import Calendar from "./components/Calendar";
import Event from "./components/Event";
import DateView from "./components/DateView";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  window.userFetch = window.userFetch || false;
  // eslint-disable-next-line
  const [user, setUser] = useContext(UserContext);
  // eslint-disable-next-line
  const [inviteList, setInviteList] = useContext(InviteContext);
  // eslint-disable-next-line
  const [eventList, setEventList] = useContext(EventListContext);

  const [redirect, setRedirect] = useState({pathname:null});

  let loc = useLocation();

  useEffect(()=>{
    fetchUser();
  // eslint-disable-next-line
  },[]);

  function executeRedirect(to) {
    setRedirect(to);
  }
  
  async function fetchUser() {
    let result = await (
      await fetch("/api/login", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
    ).json();

    window.userFetch = true;

    if (!result.error) {
      setUser(result);
      updateEvents(result.id);
    } else {
      setUser(null);
    }
  }

  async function updateEvents(id) {
    let result = await(await fetch("/api/event/user/"+id)).json();
    if(!result.error) {
      setEventList(result.events);
      setInviteList(result.invites);
    }
  }

  function addRedirect() {
    if(redirect.pathname!=null && redirect.pathname !== loc.pathname) {
      return <Redirect push to={redirect}/>
    }
    if(redirect.pathname === loc.pathname) setRedirect({pathname:null});
    return null;
  }

  return (
    <div className="App d-flex flex-column">
      <Header className="flex-shrink-0" redirectCallback={(to)=>executeRedirect(to)} />
      <div className="container flex-grow-1">
        {window.userFetch===true?
        <Switch>
          {addRedirect()}
          <Route exact path="/" render={()=><Redirect to="/calendar" />}/>

          <ProtectedRoute exact path="/login"
          component={Login}
          whenLoggedOut
          fallbackPath="/calendar"
          locationPathname={loc.pathname}
          redirectCallback={(to)=>executeRedirect(to)} />

          <ProtectedRoute exact path="/register"
          component={Register}
          whenLoggedOut
          fallbackPath="/calendar"
          locationPathname={loc.pathname}
          redirectCallback={(to)=>executeRedirect(to)} />

          <ProtectedRoute exact path={["/calendar/:yearmonth", "/calendar"]}
          component={Calendar}
          whenLoggedIn
          fallbackPath="/login"
          locationPathname={loc.pathname}
          redirectCallback={(to)=>executeRedirect(to)} />

          <ProtectedRoute exact path={["/date/:date", "/date"]}
          component={DateView}
          whenLoggedIn
          fallbackPath="/login"
          locationPathname={loc.pathname}
          redirectCallback={(to)=>executeRedirect(to)} />

          <ProtectedRoute exact path="/date/:date/create-event"
          component={CreateEvent}
          whenLoggedIn
          fallbackPath="/login"
          locationPathname={loc.pathname}
          redirectCallback={(to)=>executeRedirect(to)} />

          <ProtectedRoute exact path="/event"
          component={Event}
          whenLoggedIn
          fallbackPath="/login"
          locationPathname={loc.pathname}
          redirectCallback={(to)=>executeRedirect(to)} />

          <Route path="*">
            <div className="d-flex justify-content-center align-items-center h-100 padb-10">
              <h1 className="mb-0 text-center">404 Page not found</h1>
            </div>
          </Route>
        </Switch>:null}
      </div>
    </div>
  );
}

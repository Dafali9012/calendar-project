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

export default function App() {
    // eslint-disable-next-line
  const [user, setUser] = useContext(UserContext);
  // eslint-disable-next-line
  const [inviteList, setInviteList] = useContext(InviteContext);
  // eslint-disable-next-line
  const [eventList, setEventList] = useContext(EventListContext);

  const [redirect, setRedirect] = useState({pathname:null});

  let loc = useLocation();

  useEffect(()=>{
    if(user == null){
      fetchUser();
    }
  // eslint-disable-next-line
  },[]);
  
  async function fetchUser() {
    let result = await (
      await fetch("/api/login", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
    ).json();

    if (!result.error) {
      setUser(result);
      updateEvents(result.id);
    }
  }

  async function updateEvents(id) {
    let result = await(await fetch("/api/event/user/"+id)).json();
    if(!result.error) {
      setEventList(result.events);
      setInviteList(result.invites);
    }
  }

  return (
    <div className="App d-flex flex-column">
      <Header className="flex-shrink-0" redirectCallback={(to)=>setRedirect(to)} />
      <div className="container flex-grow-1">
        <Switch>
          {(redirect.pathname!=null && redirect.pathname !== loc.pathname)?<Redirect to={redirect}/>:null}
          <Route exact path="/" render={()=> {
            if(user!=null)return<Calendar redirectCallback={(to)=>setRedirect(to)} />;
            else setRedirect({pathname:"/login"})}}
          />
          <Route exact path="/login" render={()=> {
            if(user==null)return<Login redirectCallback={(to)=>setRedirect(to)}/>
            else setRedirect({pathname:"/"})}}
          />
          <Route exact path="/register" render={()=> {
            if(user==null)return<Register redirectCallback={(to)=>setRedirect(to)}/>;
            else setRedirect({pathname:"/"})}}
          />
          <Route exact path={["/date/:date", "/date"]} render={() => {
            if(user!=null)return<DateView locationPathname={loc.pathname} redirectCallback={(to)=>setRedirect(to)}/>;
            else setRedirect({pathname:"/login"})}}
          />
          <Route exact path="/date/:date/create-event" render={()=> {
            if(user!=null)return<CreateEvent redirectCallback={(to)=>setRedirect(to)}/>;
            else setRedirect({pathname:"/login"})}}
          />
          <Route exact path="/event" render={(props) => {
            if(user!=null)return<Event {...props} redirectCallback={(to)=>setRedirect(to)} />;
            else setRedirect({pathname:"/login"})}}
          />
        </Switch>
      </div>
    </div>
  );
}

import React, { useContext , useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

  
  useEffect(()=>{
    console.log("mounted app");
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
      fetchEvents(result.id)
    }
  }

  async function fetchEvents(id) {
    let userEvents = await (
      await fetch(`/api/user_event/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
    ).json();

    let actualEvents = [];
    let actualInvites = [];

    if(!userEvents.error) {
      userEvents.forEach(async (userEvent)=>{
        if(userEvent.attending !== null) {
          let result = await (
            await fetch(`/api/event/eventid/${userEvent.eventId}`, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            })
          ).json();
          if(!result.error) {
            let push = true;
            if(userEvent.attending==="false" && result.author !== id) push = false;
            if(push) actualEvents.push(result);
          } 
        } else {
          let result = await (
            await fetch(`/api/event/eventid/${userEvent.eventId}`, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            })
          ).json();
          if(!result.error) actualInvites.push(result);
        }
      });
    }
    setEventList(actualEvents);
    setInviteList(actualInvites);
  }

  return (
    <Router>
      <div className="App d-flex flex-column">
        <Header className="header flex-shrink-0" />
        <div className="container flex-grow-1">
          <Switch>
            <Route exact path="/" render={()=> {
              if(user!=null)return<Calendar />;
              return<Redirect to="/login" />}}
            />
            <Route exact path="/login" render={()=> {
              return<Login/>;}}
            />
            <Route exact path="/register" render={()=> {
              if(user==null)return<Register />;
              return<Redirect to="/" />}}
            />
            <Route exact path={["/date/:date", "/date"]} render={() => {
              if(user!=null)return<DateView />;
              return<Redirect to="/login" />}}
            />
            <Route exact path="/date/:date/create-event" render={()=> {
              if(user!=null)return<CreateEvent />;
              return<Redirect to="/login" />}}
            />
            <Route exact path="/event" render={(props) => {
              if(user!=null)return<Event {...props} />;
              return<Redirect to="/login" />}}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

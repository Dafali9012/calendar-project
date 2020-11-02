import React, { useContext , useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserContext, EventListContext, EmailContext } from "./Store";
import { Redirect } from 'react-router-dom';
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateEvent from "./components/CreateEvent";
import Calendar from "./components/Calendar";
import Event from "./components/Event";
import DateView from "./components/DateView";


export default function App() {
  const [user, setUser] = useContext(UserContext);
  // eslint-disable-next-line
  const [eventList, setEventList] = useContext(EventListContext);
  const [emailList, setEmailList] = useContext(EmailContext);
  

  if (user == null) {
    fetchUser();
  }


  useEffect(()=>{
    if(user == null){
      fetchUser()
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
      fetchEventList(result.id)
    }
  }

  async function fetchEventList(id) {
    let result = await (
      await fetch(`/api/event/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
    ).json();

    if (!result.error) {
      setEventList(result);
      getEmailList()
    }
  }

  async function getEmailList() {
    let result = await (
      await fetch(`/api/user`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
    ).json();
    setEmailList(result);
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
            <Route exact path="/event" render={() => {
              if(user!=null)return<Event />;
              return<Redirect to="/event" />}}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

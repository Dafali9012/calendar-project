import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserContext } from "./Store";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateEvent from "./components/CreateEvent";
import Calendar from './components/Calendar';
import Event from './components/Event';
import DateView from './components/DateView';


export default function App() {
  const [user, setUser] = useContext(UserContext);
  if(user == null){
    fetchUser()
  }
  return (
    <Router>
      <div className="App d-flex flex-column">
        <Header className="header flex-shrink-0" />
        <div className="container flex-grow-1">
          <Switch>
            <Route exact path="/" render={()=>{
              if(user)return<Calendar />
              return<Login />}}
            />
            <Route path="/login" render={()=>{
              if(!user)return<Login/>
              return<Calendar />}}
            />
            <Route path="/register" render={()=>{
              if(!user)return<Register />
              return<Calendar />}}
            />
            <Route path={["/date/:date", "/date"]} render={() => {
              if(user)return<DateView />
              return<Login />}}
            />
            <Route path="/date/:date/create-event" render={()=>{
              if(user)return<CreateEvent />;
              return <Login />}}
            />
            <Route path="/event" render={(props) => {
              if(user)return<Event {...props} />
              return<Login />}}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );

  async function fetchUser() {
    let result = await (
      await fetch("/api/login", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
    ).json();

    if (!result.error) {
      setUser(result);
    }
  }
}

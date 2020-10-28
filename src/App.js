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
  fetchUser();
  return (
    <Router>
      <div className="App d-flex flex-column">
        <Header className="header flex-shrink-0" />
        <div className="container flex-grow-1">
          <Switch>
            <Route exact path="/" component={Calendar} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/date" component={DateView} />
            <Route path="/create-event" component={CreateEvent} />
            <Route path="/event" render={(props)=> <Event {...props}/>} />
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

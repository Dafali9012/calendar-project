import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateEvent from "./components/CreateEvent";
import Calendar from "./components/Calendar";

export default function App() {
  return (
      <Router>
        <div className="App d-flex flex-column">
          <Header className="header flex-shrink-0" />
          <div className="container flex-grow-1">
            <Switch>
              <Route exact path="/" component={Calendar} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/createevent" component={CreateEvent} />
            </Switch>
          </div>
        </div>
      </Router>
  );
}

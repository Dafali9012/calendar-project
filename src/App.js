import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
//import Calendar from "./components/Calendar";
import CreateEvent from "./components/CreateEvent";
import MonthView from "./components/MonthView"


export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={MonthView} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/createevent" component={CreateEvent} />
            <Route path="/month" component={MonthView} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

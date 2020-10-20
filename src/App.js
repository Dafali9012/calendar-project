import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Calendar from "./components/Calendar";
import CreateEvent from "./components/CreateEvent";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Route exact path="/" component={Calendar} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/createevent"><CreateEvent/></Route>
        </div>
      </div>
    </Router>
  );
}

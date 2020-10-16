import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Calendar from "./components/Calendar";



function App() {
  return (
    <Router>
    <div className="App">
      <Header />
    <div className="container">

      <Switch>
        <Route exact path="/" component={Calendar} />
        <Route path="/Login" component={Login} />
        <Route path="/Register" component={Register} />
      </Switch>
      </div>
    </div>
  </Router>
  );
}

export default App;

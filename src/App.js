import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import './App.css';

import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Router>
    <div className="app">

      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />


      </Switch>
    </div>
  </Router>
  );
}

export default App;

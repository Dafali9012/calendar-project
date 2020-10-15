import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";


function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/Register" component={Register} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;

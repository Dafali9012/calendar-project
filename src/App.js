import React from 'react';
import CreateEvent from './components/CreateEvent';
/*
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Calendar from "./components/Calendar";
*/

function App() {
  return (
    <div className="container">
      <h1 className="h1 text-center">React Calendar</h1>
      <CreateEvent/>

    {/*
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/Login" component={Login} />
            <Route path="/Register" component={Register} />
            <Route path="/Calendar" component={Calendar} />
          </Switch>
        </div>
      </Router>
    */}
    </div>
  );
}

export default App;

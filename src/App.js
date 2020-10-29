import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateEvent from "./components/CreateEvent";
import Calendar from "./components/Calendar";
import DateView from "./components/DateView";
import { UserContext } from "./Store";

export default function App() {
  document.title = "Calendar"
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
            
            <Route path="/login" render={() => {
              if(!user){
                return(<Login/>)}
              return(<Calendar/>)}} />

            <Route path="/register" 
            component={Register} />
            
            <Route exact path="/" render={() => {
              if(user){
                return(<Calendar/>)}
              return(<Login/>)}} />

            <Route path="/date" render={() => {
              if(user){
                return(<DateView/>)}
              return(<Login/>)}} />

            <Route path="/createevent" render={() => {
              if(user){
                return(<CreateEvent/>)}
              return(<Login/>)}} />

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

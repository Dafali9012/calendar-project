import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserContext, EventListContext } from "./Store";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateEvent from "./components/CreateEvent";
import Calendar from "./components/Calendar";
import Event from "./components/Event";
import DateView from "./components/DateView";

export default function App() {
  const [user, setUser] = useContext(UserContext);
  const [eventList, setEventList] = useContext(EventListContext);

  if (user == null) {
    fetchUser();
  }

  return (
    <Router>
      <div className="App d-flex flex-column">
        <Header className="header flex-shrink-0" />
        <div className="container flex-grow-1">
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                if (user != null) return <Calendar />;
                return <Login />;
              }}
            />
            <Route
              exact
              path="/login"
              render={() => {
                if (user == null) return <Login />;
                return <Calendar />;
              }}
            />
            <Route
              exact
              path="/register"
              render={() => {
                if (user == null) return <Register />;
                return <Calendar />;
              }}
            />
            <Route
              exact
              path={["/date/:date", "/date"]}
              render={() => {
                if (user != null) return <DateView />;
                return <Login />;
              }}
            />
            <Route
              exact
              path="/date/:date/create-event"
              render={() => {
                if (user != null) return <CreateEvent />;
                return <Login />;
              }}
            />
            <Route
              exact
              path="/event"
              render={(props) => {
                if (user != null) return <Event {...props} />;
                return <Login />;
              }}
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
      fetchEventList(result.id)
    }
  }

  async function fetchEventList(id) {
    let result = await (
      await fetch(`/api/event/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
    ).json();

    if (!result.error) {
      setEventList(result);
    }
  }
}

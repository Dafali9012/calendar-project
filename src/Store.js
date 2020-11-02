import React, { useState } from "react";

export const UserContext = React.createContext();
export const EventListContext = React.createContext();

function Store({ children }) {
  const [user, setUser] = useState(null);
  const [eventList, setEventList] = useState([]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <EventListContext.Provider value={[eventList, setEventList]}>
        {children}
      </EventListContext.Provider>
    </UserContext.Provider>
  );
}

export default Store;

import React, { useState } from "react";

export const UserContext = React.createContext();
export const EventListContext = React.createContext();
export const EmailContext = React.createContext();

function Store({ children }) {
  const [user, setUser] = useState(null);
  const [emailList, setEmailList] = useState([]);
  const [eventList, setEventList] = useState([]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <EventListContext.Provider value={[eventList, setEventList]}>
      <EmailContext.Provider value={[emailList, setEmailList]}>
        {children}
        </EmailContext.Provider>
      </EventListContext.Provider>
    </UserContext.Provider>
  );
}

export default Store;

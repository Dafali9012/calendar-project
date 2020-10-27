import React, { useState} from "react";

export const UserContext = React.createContext();

function Store({children}) {
  const [user, setUser] = useState({
    name: "Test",
    agr: 23,
    id: 1,
  });
return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
}

export default Store;

import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextrovider({ children }) {
  const [user, setUser] = useState({
    uid: "",
    email: "",
    password: "",
    name: "",
    wid: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

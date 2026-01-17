import { type ReactNode, useState } from "react";
import { LoggedContext } from "../contexts/LoggedContext";

export const LoggedProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <LoggedContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoggedContext.Provider>
  );
};
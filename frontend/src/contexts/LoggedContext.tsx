import React, { createContext } from "react";

export const LoggedContext = createContext<{
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  loggedIn: false,
  setLoggedIn: () => {},
});

export const useLogged = () => React.useContext(LoggedContext);

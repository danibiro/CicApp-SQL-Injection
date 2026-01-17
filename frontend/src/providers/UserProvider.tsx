import { type ReactNode, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import type User from "../entities/User";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
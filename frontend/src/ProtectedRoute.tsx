// routes/ProtectedRoute.tsx
import { Navigate } from "react-router";
import { useContext, type JSX } from "react";
import { LoggedContext } from "./contexts/LoggedContext";

type Props = {
  children: JSX.Element;
};

export default function ProtectedRoute({ children }: Props) {
  const { loggedIn } = useContext(LoggedContext);

  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

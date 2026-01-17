import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Home.tsx";
import { LoggedProvider } from "./providers/LoggedProvider.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { UserProvider } from "./providers/UserProvider.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontFamily: "Poppins, Arial, sans-serif",
      fontWeight: 600,
      fontSize: "3rem",
    },
    h2: {
      fontFamily: "Poppins, Arial, sans-serif",
      fontWeight: 500,
      fontSize: "2rem",
    },
    h4: {
      fontFamily: "Poppins, Arial, sans-serif",
      fontWeight: 500,
      fontSize: "1.5rem",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider theme={theme}>
        <LoggedProvider>
          <UserProvider>
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<App />} />
            </Routes>
          </UserProvider>
        </LoggedProvider>
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>,
);

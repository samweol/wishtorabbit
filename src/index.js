import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import { LoaderContextProvider } from "./context/LoaderContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>

  <UserContextProvider>
    <LoaderContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoaderContextProvider>
  </UserContextProvider>

  // </React.StrictMode>
);

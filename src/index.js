import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import { BrowserRouter } from "react-router-dom";
import { UserContextrovider } from "./context/UserContext";
import { LoaderContextrovider } from "./context/LoaderContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <UserContextrovider>
    <LoaderContextrovider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoaderContextrovider>
  </UserContextrovider>
  // </React.StrictMode>
);

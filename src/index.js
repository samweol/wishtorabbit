import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import { BrowserRouter } from "react-router-dom";
import { UserContextrovider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextrovider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextrovider>
  </React.StrictMode>
);

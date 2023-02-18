//모듈 import
import { React } from "react";
import { Routes, Route } from "react-router-dom";

//라우팅 화면 import
import Comments from "./comment/comments";
import Home from "./Home";
import Auth from "./auth/index";
import LogIn from "./auth/login";
import Register from "./auth/register";
import MakeWishes from "./makeWishes";
import SharePage from "./linkShare/index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/login" element={<LogIn />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/comments" element={<Comments />}></Route>
      <Route path="/makewish" element={<MakeWishes />}></Route>
      <Route path="/home/:userID" element={<SharePage />}></Route>
    </Routes>
  );
}

export default App;

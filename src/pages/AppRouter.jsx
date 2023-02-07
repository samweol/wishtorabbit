//절구통 코멘트 관련 모듈 import
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Comments from "./comment/comments";
import Home from "./Home";

import Auth from "./login/auth";
import MakeWishes from "./makeWishes";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/comments" element={<Comments />}></Route>
        <Route path="/makewish" element={<MakeWishes />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;

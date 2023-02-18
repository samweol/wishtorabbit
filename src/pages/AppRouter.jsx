//절구통 코멘트 관련 모듈 import
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import Comments from "./comment/comments";
import Home from "./Home";

import Auth from "./login/auth";
import MakeWishes from "./makeWishes";

import SharePage from "./linkShare/index";

const AppRouter = ({ isLoggedIn }) => {
  const params = useParams();
  console.log("페이지 파라미터", params);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/comments" element={<Comments />}></Route>
        <Route path="/makewish" element={<MakeWishes />}></Route>
        <Route path="/:uid" element={<SharePage userID={params} />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;

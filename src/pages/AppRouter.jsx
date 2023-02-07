//절구통 코멘트 관련 모듈 import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Comments from "./comment/comments";
import Home from "./Home";
import Auth from "./login/auth";
import MakeWishes from "./makeWishes";

const AppRouter = ({ isLoggedIn }) => {
  console.log(isLoggedIn);
  return (
    <Router>
      <Routes>
        {/*로그인 성공 시 Home으로, 실패 시 auth로 넘어갑니다.*/}
        {isLoggedIn ? (
          <Route path="/" element={<Home />}></Route>
        ) : (
          <Route path="/auth" element={<Auth />}></Route>
        )}

        {/*코멘트 작성 화면 라우팅*/}
        <Route path="/comments" element={<Comments />}></Route>
        <Route path="/makewish" element={<MakeWishes />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;

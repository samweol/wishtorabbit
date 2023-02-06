//절구통 코멘트 관련 모듈 import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Comments from "./mortar/comments";
import Home from "./Home";
import MakeWishes from "./makeWishes";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Routes>
        {/*로그인 여부 상관없이 전부 Home으로 가게 해둔 상태입니다.*/}
        {isLoggedIn ? (
          <Route path="/" element={<Home />}></Route>
        ) : (
          <Route path="/" element={<Home />}></Route>
        )}

        {/*코멘트 작성 화면 라우팅*/}
        <Route path="/comments" element={<Comments />}></Route>
        <Route path="/makewish" element={<MakeWishes />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;

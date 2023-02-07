import { React, useEffect, useState } from "react";
import { authService } from "../routes/firebase";
import { Routes, Route, useNavigate } from "react-router-dom";
import Comments from "./comment/comments";
import Home from "./Home";
import Auth from "./login/auth";
import MakeWishes from "./makeWishes";

function App() {
  const [init, setInit] = useState(false); // 화면 초기화 여부
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부
  const navigate = useNavigate();
  // 아래의 코드를 firestore에서 가져오는 방식으로 수정해야 합니다.
  // 로그인 정보 전역관리 완료하면 수정 예정
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  useEffect(() => {
    setInit(true); // user 정보 확인되면 초기화 완료
    if (isLoggedIn) {
      navigate("/");
    } else {
      navigate("/auth");
    }
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/auth" element={<Auth />}></Route>
      <Route path="/comments" element={<Comments />}></Route>
      <Route path="/makewish" element={<MakeWishes />}></Route>
    </Routes>
  );
}

export default App;

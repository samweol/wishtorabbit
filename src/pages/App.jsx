import { React, useContext, useEffect, useState } from "react";
import { authService } from "../routes/firebase";
import { Routes, Route, useNavigate } from "react-router-dom";
import Comments from "./comment/comments";
import Home from "./Home";
import Auth from "./login/auth";
import MakeWishes from "./makeWishes";
import { UserContext } from "../context/UserContext";

function App() {
  const [init, setInit] = useState(false); // 화면 초기화 여부
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const fetchUser = async () => {
    try {
      // 파이어베이스에서 user 정보 가져오기
      // setUser 사용해서 가져온 정보 담기
    } catch (err) {
      console.log(err);
    }
  };
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
      //fetchUser 호출하기
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

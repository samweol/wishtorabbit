import { React, useContext, useEffect, useState } from "react";
import { authService, dbService } from "../routes/firebase";
import { Routes, Route, useNavigate } from "react-router-dom";
import Comments from "./comment/comments";
import Home from "./Home";
import Auth from "./login/auth";
import MakeWishes from "./makeWishes";
import { UserContext } from "../context/UserContext";
import { collection, query, where, getDocs } from "firebase/firestore";

function App() {
  const [init, setInit] = useState(false); // 화면 초기화 여부
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [userId, setUserId] = useState("");

  const fetchUser = async () => {
    try {
      const q = query(
        collection(dbService, "user"),
        where("uid", "==", userId) // uid로 특정 user 가져오기
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setUser({
          uid: data.uid,
          email: data.email,
          name: data.name,
          password: data.password,
          wid: data.wid,
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.uid); // 원하는 유저를 firestore에서 가져오기 위해 email 저장(유저판별용)
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  useEffect(() => {
    setInit(true); // user 정보 확인되면 초기화 완료
    if (isLoggedIn) {
      navigate("/");
      fetchUser();
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

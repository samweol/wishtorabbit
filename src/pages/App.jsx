import { React, useEffect, useState } from "react";
import AppRouter from "./AppRouter";
import { authService } from "../routes/firebase";

function App() {
  const [init, setInit] = useState(false); // 화면 초기화 여부
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부

  // 아래의 코드를 firestore에서 가져오는 방식으로 수정해야 합니다.
  // 로그인 정보 전역관리 완료하면 수정 예정
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true); // user 정보 확인되면 초기화 완료
    });
  }, []);

  return (
    <>{init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}</>
  );
}

export default App;

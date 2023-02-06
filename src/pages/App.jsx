import { React, useState } from "react";
import AppRouter from "./AppRouter";

function App() {
  //로그인 됐는지 안됐는지 확인하는 작업 필요, 무조건 했다고 하겠습니다
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return <AppRouter isLoggedIn={isLoggedIn} />;
}

export default App;

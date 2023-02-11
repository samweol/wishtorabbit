import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [haveAccount, setHaveAccount] = useState();
  const navigate = useNavigate();

  const onLogInClick = () => setHaveAccount(true);
  const onRegisterClick = () => setHaveAccount(false);

  useEffect(() => {
    if (haveAccount) {
      // 계정이 있기 때문에 로그인 화면으로
      navigate("/login");
    } else {
      // 계정이 없기 때문에 회원가입 화면으로
      navigate("/register");
    }
  }, [haveAccount]);

  return (
    <div>
      <h1>계정이 있습니까?</h1>
      <button type="submit" onClick={onLogInClick}>
        yes
      </button>
      <button type="submit" onClick={onRegisterClick}>
        no
      </button>
    </div>
  );
}

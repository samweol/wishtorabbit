import { authService } from "../../routes/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState(""); // email
  const [password, setPassword] = useState(""); // password

  const navigate = useNavigate();

  //이미 로그인한 사용자는 홈으로 바로 이동하게끔
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) navigate("/home");
    });
  }, []);

  const onChange = (event) => {
    // email, password, username 입력창 상태 확인
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      // login
      const data = await signInWithEmailAndPassword(
        authService,
        email,
        password
      );
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>로그인 해라</h1>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
        />
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
};
export default LogIn;

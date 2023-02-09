import { authService } from "../../routes/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

const LogIn = () => {
  const [email, setEmail] = useState(""); // email
  const [password, setPassword] = useState(""); // password

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

      console.log(data);
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

        {/* newAccount 값이 ture이면 회원가입 버튼, 아니라면 로그인 버튼 */}
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
};
export default LogIn;

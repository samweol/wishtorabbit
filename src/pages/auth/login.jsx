import { authService } from "../../routes/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../style/auth.module.css";

const LogIn = () => {
  const [email, setEmail] = useState(""); // email
  const [password, setPassword] = useState(""); // password
  const [state, setState] = useState("success"); // 로그인 state
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
      setState(error.message);
    }
  };

  return (
    <div>
      <hr className={styles.line} />
      <h1 className={styles.header}> 🐇 로그인을 해주세요 🐇</h1>
      {state !== "success" ? (
        <div>
          <p className={styles.error}>로그인에 실패했습니다.</p>
          <p className={styles.error}>{state}</p>
        </div>
      ) : null}
      <hr className={styles.line} />
      <form onSubmit={onSubmit} className={styles.centerBox}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={onChange}
          className={styles.inputBox}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          className={styles.inputBox}
        />
        <input type="submit" value="🤍" className={styles.submitBtn} />
      </form>
    </div>
  );
};
export default LogIn;

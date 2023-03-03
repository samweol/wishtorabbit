import { authService, dbService } from "../../routes/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import styles from "../../style/auth.module.css";

const Register = () => {
  const [email, setEmail] = useState(""); // email
  const [password, setPassword] = useState(""); // password
  const [username, setUsername] = useState(""); // username

  const navigate = useNavigate();

  const onChange = (event) => {
    // email, password, username 입력창 상태 확인
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "username") {
      setUsername(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;

      // crete account
      data = await createUserWithEmailAndPassword(authService, email, password);
      // firestore에 auth 정보 저장
      try {
        await addDoc(collection(dbService, "user"), {
          name: username,
          email: data.user.email,
          password: data.user.reloadUserInfo.passwordHash, //pw hash
          uid: data.user.uid,
          wid: uuid(),
        });
        navigate("/");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <hr className={styles.line} />
      <h1 className={styles.header}>🐇 회원가입을 해주세요 🐇</h1>
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
        <hr className={styles.line} />
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={onChange}
          className={styles.inputBox}
        />
        <hr className={styles.line} />
        <input type="submit" value="🤍" className={styles.submitBtn} />
      </form>
    </div>
  );
};
export default Register;

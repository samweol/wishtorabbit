import { authService, dbService } from "../../routes/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState(""); // email
  const [password, setPassword] = useState(""); // password
  const [username, setUsername] = useState(""); // username
  const [newAccount, setNewAccount] = useState(true); // 회원가입 판별 여부

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
      if (newAccount) {
        // crete account
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
        // firestore에 auth 정보 저장
        try {
          await addDoc(collection(dbService, "user"), {
            name: username,
            email: data.user.email,
            password: data.user.reloadUserInfo.passwordHash, //pw hash
            uid: data.user.uid,
            wid: 99,
          });
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      } else {
        // login
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>회원가입 해라</h1>
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
        <input
          name="username"
          type="text"
          placeholder="username"
          value={username}
          onChange={onChange}
        />
        {/* newAccount 값이 ture이면 회원가입 버튼, 아니라면 로그인 버튼 */}
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
      </form>
    </div>
  );
};
export default Auth;

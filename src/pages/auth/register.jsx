import { authService, dbService } from "../../routes/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";

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
          placeholder="Username"
          value={username}
          onChange={onChange}
        />
        <input type="submit" value="Create Account" />
      </form>
    </div>
  );
};
export default Register;

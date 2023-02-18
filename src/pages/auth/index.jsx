import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { authService, dbService } from "../../routes/firebase";
import { UserContext } from "../../context/UserContext";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Auth() {
  const { user, setUser } = useContext(UserContext); //user정보 전역 저장
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

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

  //1) 화면 처음 들어오면 유저확인, user에는 빈 값이 들어가 있다.
  //2) onAuthStateChanged로 로그인된 상태값 확인
  //3) 상태값이 존재하면 로그인이 된 상태이므로 home으로 이동
  //4) 상태값이 존재하지 않는다면 로그인이 안된 상태이므로 auth로 이동

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid); // 원하는 유저를 firestore에서 가져오기 위해 uid 저장(유저판별용)
        console.log(user.email);
        setUser(user);
        fetchUser();
        navigate("/home");
      } else {
        //로그인 안된 유저라면 user에 정보가 없으므로 auth로 이동하게 됨
        setHaveAccount(false);
      }
    });
  }, []);

  const [haveAccount, setHaveAccount] = useState();

  const onLogInClick = () => {
    setHaveAccount(true);
    navigate("/login");
  };
  const onRegisterClick = () => {
    setHaveAccount(false);
    navigate("/register");
  };

  if (haveAccount === false) {
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
  } else
    return (
      <div>
        <h1>Initializing...</h1>
      </div>
    );
}

import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../routes/firebase";
import { UserContext } from "../../context/UserContext";
import styles from "../../style/auth.module.css";

export default function Auth() {
  const { user } = useContext(UserContext); //user정보 전역 저장
  const [userId, setUserId] = useState("");
  const [haveAccount, setHaveAccount] = useState();

  const navigate = useNavigate();

  //1) 화면 처음 들어오면 유저확인, user에는 빈 값이 들어가 있다.
  //2) onAuthStateChanged로 로그인된 상태값 확인
  //3) 상태값이 존재하면 로그인이 된 상태이므로 home으로 이동
  //4) 상태값이 존재하지 않는다면 로그인이 안된 상태이므로 auth로 이동

  useEffect(() => {
    authService.onAuthStateChanged((fuser) => {
      if (fuser) {
        setUserId(fuser.uid); // 원하는 유저를 firestore에서 가져오기 위해 uid 저장(유저판별용)
        navigate("/home");
      } else {
        //로그인 안된 유저라면 user에 정보가 없으므로 auth로 이동하게 됨
        setHaveAccount(false);
      }
    });
  }, []);

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
        <hr className={styles.line} />
        <h1 className={styles.header}>🤍🐇Wish To Rabbit🐇🤍</h1>
        <h2 className={styles.middleHeader}>계정이 있습니까?</h2>
        <hr className={styles.line} />
        <div className={styles.centerBox}>
          <button
            type="submit"
            onClick={onLogInClick}
            className={styles.submitBtn}
          >
            YES
          </button>
          <button
            type="submit"
            onClick={onRegisterClick}
            className={styles.submitBtn}
          >
            NO
          </button>
        </div>
      </div>
    );
  } else
    return (
      <div>
        <h1>Initializing...</h1>
      </div>
    );
}

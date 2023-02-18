import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  EmailIcon,
  EmailShareButton,
} from "react-share";
import { authService, dbService } from "../routes/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Home = () => {
  //다시 fetch하므로 새로고침하면 userContext 다시 저장 됨
  //파이어베이스가 새로고침해도 유저 정보를 안잃는다고 했는데..
  //왜 새로고침하고서 fetchUser 다시 안하면 userContext 에 빈 값이 들어가는지 모르겠네 ㅠ
  //그래서 fetchUser 코드 여기다가도 넣어놨어!
  const { user, setUser } = useContext(UserContext); //user정보 전역 저장
  const [userId, setUserId] = useState("");

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

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      setUser(user);
      setUserId(user.uid);
      fetchUser();
    });
  }, []);

  //define navigation
  const navigation = useNavigate();

  //navigate to Comments page
  const homeToComments = () => {
    navigation("/comments");
  };
  const navigateToMakeWish = () => {
    navigation("/makewish");
  };

  //현재 화면 URL
  let currentUrl = window.location.href;
  //공유할 URL
  let shareUrl = currentUrl + `/${user.uid}`;

  return (
    <div>
      <div>
        {/*makeWish button*/}
        <button onClick={navigateToMakeWish}>나만의 소원 달 만들기</button>
        {/*mortar button*/}
        <button onClick={homeToComments} className="mortarBtn">
          코멘트 달아주기
        </button>
      </div>
      {/*url share and social share*/}
      <div>
        <h3>공유하기</h3>
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={48} round={true} borderRadius={24}></FacebookIcon>
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl}>
          <TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
        </TwitterShareButton>
        <EmailShareButton url={shareUrl}>
          <EmailIcon size={48} round={true} borderRadius={24}></EmailIcon>
        </EmailShareButton>
        <CopyToClipboard
          text={shareUrl}
          onCopy={(event) =>
            alert(`주소가 복사되었습니다.\n복사된 주소: ${event}`)
          }
        >
          <button>URL</button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default Home;

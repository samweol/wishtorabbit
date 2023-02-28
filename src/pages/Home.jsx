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
import { LoaderContext } from "../context/LoaderContext";
import Loader from "../loader/Loader";
import "../style/reset.css";
import styles from "../style/home.module.css";

const Home = () => {
  //define navigation
  const navigation = useNavigate();

  const { user, setUser } = useContext(UserContext); //user정보 전역 저장

  const { isLoading, setLoading } = useContext(LoaderContext);

  const [userId, setUserId] = useState("");
  const [wish, setWish] = useState({});

  const current = new Date().getMonth() + 1;
  const flag = Object.keys(wish).length == 0;
  console.log(current);

  const fetchWish = async () => {
    setLoading(true);
    try {
      let tempData = {};
      const q = query(
        collection(dbService, "wish"),
        where("uid", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const dataMonth = new Date(data.createdAt.toDate()).getMonth() + 1;
        if (dataMonth === current) {
          tempData = data;
          console.log("소원이 있는 경우");
        }
        setWish(tempData);
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    authService
      .signOut()
      .then(function () {
        setUser(null);
        navigation("/");
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        //fetchUser();
      } else {
        navigation("/");
      }
    });
  }, []);

  useEffect(() => {
    fetchWish();
  }, [user]);

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

  if (isLoading)
    return <Loader type="spin" color="RGB 값" message={"로딩중입니다."} />;
  return (
    <div className={styles.container}>
      <div>
        {/* <h1 className={styles.title}>{`${current}월달의 소원`}</h1> */}
        <h1 className={styles.title}>{`${user.name}님의 달`}</h1>
        {wish.content ? (
          <div className={styles.wish}>{wish.content}</div>
        ) : null}
      </div>
      <div>
        {/*makeWish button*/}
        {flag ? (
          <button onClick={navigateToMakeWish}>나만의 소원 달 만들기</button>
        ) : null}

        {/*mortar button
        <button onClick={homeToComments} className="mortarBtn">
          코멘트 달아주기
        </button>*/}
      </div>
      {/*url share and social share*/}
      <h3 className={styles.text}>공유하기</h3>
      <div className={styles.shareBtn}>
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
      <img className={styles.moon} src="/images/moon.png" alt="달 사진" />
      <button onClick={logOut}>로그아웃</button>
    </div>
  );
};

export default Home;

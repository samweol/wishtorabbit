import React, { useContext } from "react";
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

const Home = () => {
  //const { user } = useContext(UserContext);
  //define navigation
  const navigation = useNavigate();

  //navigate to Comments page
  const homeToComments = () => {
    navigation("/comments");
  };
  const navigateToMakeWish = () => {
    navigation("/makewish");
  };

  //console.log("USER: ", user); // user 확인

  //현재 화면 URL
  let currentUrl = window.location.href;
  //공유할 URL
  //let shareUrl = currentUrl + `${user.uid}`;
  let shareUrl = currentUrl + "wttaPCWjRCeQBb67IKbMjMZ1UU72";

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

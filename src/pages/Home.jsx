import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  //define navigation
  const navigation = useNavigate();

  //navigate to Comments page
  const homeToComments = () => {
    navigation("/comments");
  };

  const navigateToMakeWish = () => {
    navigation("/makewish");
  };

  return (
    <div>
      {/*makeWish button*/}
      <button onClick={navigateToMakeWish}>나만의 소원 달 만들기</button>
      {/*mortar button*/}
      <button onClick={homeToComments} className="mortarBtn">
        코멘트 달아주기
      </button>
    </div>
  );
};

export default Home;
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  //define navigation
  const navigation = useNavigate();

  //navigate to Comments page
  const homeToComments = () => {
    navigation("/comments");
  };

  return (
    <div>
      {/*mortar button*/}
      <button onClick={homeToComments} className="mortarBtn">
        코멘트 달아주기
      </button>
    </div>
  );
};

export default Home;

import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { dbService } from "../../routes/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const SharePage = ({ userID }) => {
  let userName, userWish, userWishTime;

  const getData = async () => {
    console.log("디테일");
    //console.log(userID);
    //const userID = userID;

    //유저 아이디로 이름 찾기
    const findUserQuery = query(
      //인자로 받은 유저아이디를 이용한 유저 이름 찾는 쿼리 작성
      collection(dbService, "user"),
      where("uid", "==", userID)
    );
    const findUser = await getDocs(findUserQuery); // 쿼리 이용하여 유저 아이디 찾기
    findUser.forEach((doc) => {
      userName = doc.data().name; //userName 불러오기
    });

    //유저 아이디로 소원 찾기
    const findWishQuery = query(
      //인자로 받은 유저아이디를 이용한 유저 소원 찾는 쿼리 작성
      collection(dbService, "wish"),
      where("uid", "==", userID)
    );
    const findWish = await getDocs(findWishQuery); //쿼리 이용하여 유저 소원 찾기
    findWish.forEach((doc) => {
      userWish = doc.data().content; //userWish 불러오기
      userWishTime = doc.data().createdAt; //소원 적은 Time 불러오기
    });

    console.log(userName, userWish, userWishTime);
  };

  useEffect(() => {
    console.log("우와~");
    getData();
  }, []);

  return (
    <div>
      <h1>{userName}의 소원</h1>
      <h2>{userWish}</h2>
      <h3>{userWishTime}에 작성되었습니다.</h3>
    </div>
  );
};

export default SharePage;

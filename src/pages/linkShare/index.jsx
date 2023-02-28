import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dbService } from "../../routes/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const SharePage = () => {
  const userID = useParams().userID;
  const [userName, setUserName] = useState("");
  const [userWish, setUserWish] = useState("");
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();

  const getData = async () => {
    //유저 아이디로 이름 찾기
    const findUserQuery = query(
      //인자로 받은 유저아이디를 이용한 유저 이름 찾는 쿼리 작성
      collection(dbService, "user"),
      where("uid", "==", userID)
    );
    const findUser = await getDocs(findUserQuery); // 쿼리 이용하여 유저 아이디 찾기
    findUser.forEach((doc) => {
      setUserName(doc.data().name);
    });

    //유저 아이디로 소원 찾기
    const findWishQuery = query(
      //인자로 받은 유저아이디를 이용한 유저 소원 찾는 쿼리 작성
      collection(dbService, "wish"),
      where("uid", "==", userID)
    );
    const findWish = await getDocs(findWishQuery); //쿼리 이용하여 유저 소원 찾기
    findWish.forEach((doc) => {
      setUserWish(doc.data().content);
    });

    //유저 아이디로 코멘트 찾기
    const findCommentsQuery = query(
      //인자로 받은 유저아이디를 이용한 유저 코멘트 찾는 쿼리 작성
      collection(dbService, "comment"),
      where("uid", "==", userID)
    );
    const findComments = await getDocs(findCommentsQuery);
    setComments(findComments.docs);
    /*findComments.docs.map((items) => console.log(items.data()));

    findComments.forEach((doc) => {
      comments.push({
        cid: doc.data().cid, //댓글아이디
        content: doc.data().content.content, //댓글내용
        createdAt: Date(doc.data().createdAt).toString(), //댓글 작성 시각
        sender: doc.data().sender.sender, //보내는 사람
        selectedType: doc.data().type.selectTypes, //재료
      });
    });
    console.log("getdata 이후 comments", comments.length);*/
  };

  useEffect(() => {
    reRender();
    getData();
  }, []);

  const [init, setInit] = useState(false);
  const reRender = () => {
    setTimeout(() => {
      setInit(true);
    }, 1000);
  };

  if (init === false) {
    return (
      <div>
        <h1>유저 정보 불러오는 중...</h1>
      </div>
    );
  } else if (userName.length === 0) {
    return (
      <div>
        <h1>유저를 찾을 수 없어요🥲</h1>
      </div>
    );
  } else {
    if (userWish.length === 0) {
      return (
        <div>
          <h1>{userName}의 소원</h1>
          <span>{userName}님은 아직 적은 소원이 없어요🥲</span>
        </div>
      );
    } else {
      return (
        <div>
          <h1>{userName}의 소원</h1>
          <h2>{userWish}</h2>
          <hr />
          <div>
            {comments.map((item) => {
              return (
                <div key={item.data().cid}>
                  <div>
                    {item.data().sender.sender}: {item.data().content.content} (
                    {item.data().type.selectTypes})
                  </div>
                  <div>{Date(item.data().createdAt).toString()} </div>
                  <hr />
                </div>
              );
            })}
          </div>
          <button onClick={() => navigate(`/comments/${userID}`)}>
            댓글 달아서 응원해주기
          </button>
        </div>
      );
    }
  }
};

export default SharePage;

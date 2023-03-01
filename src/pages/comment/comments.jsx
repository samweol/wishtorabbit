import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authService, dbService } from "../../routes/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import uuid from "react-uuid";

const Comments = () => {
  const types = [
    { key: 1, value: "팥" },
    { key: 2, value: "꿀" },
    { key: 3, value: "깨" },
    { key: 4, value: "밤" },
    { key: 5, value: "콩" },
  ]; //재료목록

  const [selectTypes, setSelectTypes] = useState(types[0].value); //사용자가 고른 재료
  const [sender, setSender] = useState(""); //보내는 사람 이름
  const [content, setContent] = useState(""); //댓글 내용

  const navigate = useNavigate(); //네비게이션 변수

  const userID = useParams().userID;

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(dbService, "comment"), {
        uid: userID, //사용자 아이디
        cid: uuid(), //코멘트 key 값
        content: { content }, //댓글 내용
        sender: { sender }, //보내는 사람
        createdAt: new Date(), //작성내용 저장 시간
        type: { selectTypes }, //댓글 작성자가 고른 재료
      });
      console.log("comment DB에 저장되었습니다. 문서 아이디: ", docRef.id);
      navigate(`/home/${userID}`);
    } catch (err) {
      console.error(err);
    }
  };

  const onChange = (event) => {
    //각종 폼 내용 입력 이벤트 처리
    const {
      target: { id, value },
    } = event;

    if (id === "type") setSelectTypes(value); //재료 변경
    else if (id === "sender") setSender(value); //보내는 사람 변경
    else if (id === "content") setContent(value); //내용 변경
  };

  return (
    <div>
      <div>
        <h3>
          떡 재료를 고른 뒤 보내는 사람의 이름과 남기고 싶은 응원을 적어주세요.
        </h3>
      </div>
      <form onSubmit={onSubmit}>
        <select id="type" onChange={onChange} value={selectTypes}>
          {types.map((type) => (
            <option id={type.key} value={type.value}>
              {type.value}
            </option>
          ))}
        </select>
        <input
          id="sender"
          type="text"
          onChange={onChange}
          value={sender}
          placeholder="이름을 입력해주세요"
          required={true}
        />
        <input
          id="content"
          type="text"
          onChange={onChange}
          value={content}
          placeholder="코멘트를 입력해주세요"
          required={true}
        />
        <button onClick={onSubmit} type="submit">
          코멘트 달기!
        </button>
      </form>
    </div>
  );
};

export default Comments;

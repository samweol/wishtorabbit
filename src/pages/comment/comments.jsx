import React, { useState } from "react";

const Comments = () => {
  const types = [
    { key: 1, value: "팥" },
    { key: 2, value: "꿀" },
    { key: 3, value: "깨" },
    { key: 4, value: "밤" },
    { key: 5, value: "콩" },
  ]; //재료목록

  const [selectTypes, setSelectTypes] = useState(types[0].value); //사용자가 고른 값
  const [sender, setSender] = useState(""); //보내는 사람 이름
  const [content, setContent] = useState(""); //댓글 내용

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };

  const onChange = (event) => {
    //각종 폼 내용 입력 이벤트 처리
    const {
      target: { id, value },
    } = event;

    if (id === "type") setSelectTypes(value);
    else if (id === "sender") setSender(value);
    else if (id === "content") setContent(value);
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

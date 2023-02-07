import React, { useState } from "react";

const Comments = () => {
  const [text, setText] = useState("");

  const onChangeText = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <form>
        <input
          onChange={onChangeText}
          value={text}
          placeholder="코멘트를 입력해주세요"
        />
        <button type="submit">코멘트 달기!</button>
      </form>
    </div>
  );
};

export default Comments;

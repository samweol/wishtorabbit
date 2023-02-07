import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MakeWishes() {
  const [wish, setWish] = useState("");
  const navigate = useNavigate();
  const onSubmit = async () => {};
  const handleChange = (event) => {
    setWish(event.target.value);
  };
  return (
    <div>
      <span>나만의 소원 달 만들기</span>
      <form onSubmit={onSubmit}>
        <label htmlFor="wish">소원 : </label>
        <input
          type="text"
          id="wish"
          name="wish"
          value={wish}
          placeholder="소원을 입력해주세요."
          onChange={handleChange}
        />
        <button type="submit" onClick={onSubmit}>
          소원 만들기
        </button>
      </form>
    </div>
  );
}

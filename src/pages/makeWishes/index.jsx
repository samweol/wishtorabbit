import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "../../routes/firebase";
import { collection, addDoc } from "firebase/firestore";
import { UserContext } from "../../context/UserContext";

export default function MakeWishes() {
  const { user } = useContext(UserContext);
  const [wish, setWish] = useState("");
  const navigate = useNavigate();

  const uid = user.uid;

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(dbService, "wish"), {
        content: wish,
        createdAt: new Date(),
        uid: uid,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
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

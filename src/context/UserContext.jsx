import { createContext, useState, useEffect } from "react";
import { authService, dbService } from "../routes/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

// createContext를 사용해서 상태값을 담을 박스 생성 -> 그 박스의 이름을 지정(UserContext)
export const UserContext = createContext();

// 상위 컴포넌트에 UserContextProvider 컴포넌트를 감싸기 위한 설정
export function UserContextProvider({ children }) {
  // 전역으로 관리하고 싶은 상태값(USER) 지정
  const [user, setUser] = useState({
    uid: "",
    email: "",
    password: "",
    name: "",
    wid: "",
  });

  useEffect(() => {
    authService.onAuthStateChanged((fuser) => {
      if (fuser) {
        const q = query(
          collection(dbService, "user"),
          where("uid", "==", fuser.uid)
        );
        onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            setUser({
              uid: data.uid,
              email: data.email,
              name: data.name,
              password: data.password,
              wid: data.wid,
            });
          });
        });
      }
    });
  }, []);

  // value는 객체이므로 리렌더링의 주범이 됨
  // 따라서 useMemo로 캐싱해두기
  //const value = useMemo(() => ({ setUser }), [setUser]);
  return (
    // 변수명.Provider 문법으로 그 범위 안에 있는 컴포넌트한테 값을 공유할 수 있음
    // value 값에 전송할 props 넣기 속성명(value)는 임의 변경 불가
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

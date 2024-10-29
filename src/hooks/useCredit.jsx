import { createContext, useContext, useReducer, useEffect } from "react";

// 초기 상태
const initialState = {
  totalCredits: Number(localStorage.getItem("credit")) || 0,
};

// 크레딧 리듀서
const creditReducer = (state, action) => {
  switch (action.type) {
    case "addCredits":
      return { ...state, totalCredits: state.totalCredits + action.amount };
    case "substractCredits":
      return { ...state, totalCredits: state.totalCredits - action.amount };
    case "setCredits":
      return { ...state, totalCredits: action.amount };
    default:
      return state;
  }
};

// CreditContext 생성
const CreditContext = createContext();

// CreditProvider 컴포넌트
export const CreditProvider = ({ children }) => {
  const [state, dispatch] = useReducer(creditReducer, initialState);

  // 로컬 스토리지에서 크레딧을 불러오는 효과
  useEffect(() => {
    const storedCredits = Number(localStorage.getItem("credit")) || 0;
    dispatch({ type: "setCredits", amount: storedCredits });
  }, []);

  useEffect(() => {
    localStorage.setItem("credit", state.totalCredits);
  }, [state.totalCredits]);

  return (
    <CreditContext.Provider
      value={{ totalCredits: state.totalCredits, dispatch }}
    >
      {children}
    </CreditContext.Provider>
  );
};

// useCredit 훅
export const useCredit = () => {
  return useContext(CreditContext);
};

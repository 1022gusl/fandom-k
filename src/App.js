import { CreditProvider } from "./hooks/useCredit";
import ListPage from "./pages/ListPage/ListPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import MyPage from "./pages/MyPage/MyPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/global.scss";

function App() {
  return (
    <CreditProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Router>
    </CreditProvider>
  );
}

export default App;

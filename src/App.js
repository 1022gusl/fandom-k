import { CreditProvider } from "./hooks/useCredit";
import ListPage from "./pages/ListPage/ListPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/global.scss";

function App() {
  return (
    <CreditProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/list" element={<ListPage />} />
          {/* 마이페이지 추가 */}
        </Routes>
      </Router>
    </CreditProvider>
  );
}

export default App;

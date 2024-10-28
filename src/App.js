//import ChartPage from "./pages/List/ChartOfTheMonth/ChartPage";
import LandingPage from "./pages/List/ChartOfTheMonth/LandingPage.jsx";
import "./styles/global.scss";
import IdolList from './pages/List/ChartOfTheMonth/components/IdolList/IdolList.jsx'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/list" element={<IdolList />} />  {/* List 페이지 라우트 추가 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
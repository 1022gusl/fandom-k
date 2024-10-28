//import ChartPage from "./pages/List/ChartOfTheMonth/ChartPage";
import LandingPage from "./pages/List/ChartOfTheMonth/LandingPage.jsx";
import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
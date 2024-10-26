import TributeSlider from "./components/slider/TributeSlider";
import "./styles/global.scss";
function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <TributeSlider />
    </div>
  );
}
export default App;

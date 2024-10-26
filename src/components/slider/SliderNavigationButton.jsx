import nextButton from "../../assets/icon/nextButton.png";
import prevButton from "../../assets/icon/prevButton.png";
const SlidernavigationButton = ({ onClick, direction, disabled }) => (
  <button
    className={`arrowButton ${direction}`}
    onClick={onClick}
    style={{
      opacity: disabled ? 0 : 1,
      pointerEvents: disabled ? "none" : "auto",
      transition: "opacity 0.3s ease",
    }}
  >
    <img
      src={direction === "prevButton" ? prevButton : nextButton}
      alt={direction}
    />
  </button>
);

export default SlidernavigationButton;

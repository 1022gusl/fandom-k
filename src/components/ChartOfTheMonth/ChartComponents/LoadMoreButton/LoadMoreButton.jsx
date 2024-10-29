import "./LoadMoreButton.scss";

const LoadMoreButton = ({ onClick }) => {
  return (
    <div className="moreButtonContainer">
      <button className="LoadMoreButton" onClick={onClick}>
        더 보기
      </button>
    </div>
  );
};

export default LoadMoreButton;

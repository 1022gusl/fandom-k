import React from "react";
import { Link } from "react-router-dom";
import GradientButton from "../common/GradientButton";
import { TfiFaceSad } from "react-icons/tfi";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="notFoundContainer">
      <TfiFaceSad className="notFoundFace" />
      <h1 className="notFoundTitle">404</h1>
      <p className="notFoundMessage">페이지가 없거나 접근할 수 없어요</p>
      <p className="notFoundSmallMessage">
        입력하신 주소가 맞는지 다시 확인해주세요!
      </p>
      <Link to="/" className="notFoundLinkBox">
        <GradientButton variant="addButton">
          <p className="notFoundLink">Fandom-K 홈으로 {">"}</p>
        </GradientButton>
      </Link>
    </div>
  );
};

export default NotFound;

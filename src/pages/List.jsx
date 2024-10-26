import React from "react";
import TributeSlider from "../components/slider/TributeSlider";

const List = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TributeSlider />
    </div>
  );
};

export default List;

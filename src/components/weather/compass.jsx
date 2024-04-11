import React from "react";

const Compass = ({ angle }) => {
  const pointerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "4px",
    height: "50%",
    backgroundColor: "red",
    transformOrigin: "50% 100%",
    transform: `rotate(${angle}deg) translate(-50%, -100%)`, // Rotate pointer
    transition: "transform 0.1s ease-in-out",
  };

  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        border: "2px solid black",
        position: "relative",
      }}
    >
      <div style={pointerStyle}></div>
    </div>
  );
};

export default Compass;

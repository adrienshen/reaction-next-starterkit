import React from "react";

export default ({ title, imageSource, price }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "1rem"
      }}
    >
      <img src={imageSource || "https://via.placeholder.com/80x100"} alt="product photo" />
      <div
        style={{
          textAlign: "left",
          paddingLeft: "1rem"
        }}
      >
        <h3
          style={{
            color: "#4E4E4E",
            fontFamily: "Lato, sans-serif",
            fontSize: "1rem",
            marginTop: 0,
            fontWeight: "normal"
          }}
        >
          {title}
        </h3>
        <span
          style={{
            color: "#B09A51",
            fontFamily: "Lato, sans-serif",
            fontSize: ".9rem",
            fontWeight: 600
          }}
        >
          {price}
        </span>
      </div>
    </div>
  );
};

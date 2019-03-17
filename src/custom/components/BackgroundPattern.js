import React, { Fragment } from "react";

export const PatternLeft = ({ position }) => {
  console.log("position: ", position);
  return (
    <Fragment>
      <div
        style={{
          position: "fixed",
          top: -500,
          left: -700,
          width: "1000px",
          height: "1000px",
          background: "#B09A51",
          opacity: 0.15,
          zIndex: -10,
          borderRadius: "50%"
        }}
      />
    </Fragment>
  );
};

export const PatternRight = ({ position }) => {
  console.log("position: ", position);
  return (
    <Fragment>
      <div
        style={{
          position: "fixed",
          top: -500,
          right: -700,
          width: "1000px",
          height: "1000px",
          background: "#B09A51",
          opacity: 0.15,
          zIndex: -10,
          borderRadius: "50%"
        }}
      />
    </Fragment>
  );
};

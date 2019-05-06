/**
 * Button components
 *
 */

import React from "react";

/** Common buttons */

export const Button = ({ type = "standard", htmlType = "button", text = "Button Text", size = "m", onClick }) => {
  const sizeStyles = {
    "s": { height: "28px", fontSize: "15px", padding: ".25rem .5rem" },
    "m": { width: "50%", height: "45px", fontSize: "18px", padding: ".5rem 1rem" },
    "l": { width: "95%", height: "50px", fontSize: "22px", padding: ".5rem 1.5rem" },
  }[size];

  if (type === "standard") return <StandardButton
    htmlType={htmlType} onClick={onClick} text={text} sizeStyles={sizeStyles} />;
  if (type === "hollow") return <HollowButton
    htmlType={htmlType} onClick={onClick} text={text} sizeStyles={sizeStyles} />;
  if (type === "greyed") return <GreyedButton
    htmlType={htmlType} onClick={onClick} text={text} sizeStyles={sizeStyles} />;
  if (type === "inverted") return <InvertedButton
    htmlType={htmlType} onClick={onClick} text={text} sizeStyles={sizeStyles} />;
  if (type === "ghost") return <GhostButton
    htmlType={htmlType} onClick={onClick} text={text} sizeStyles={sizeStyles} />;
}

function StandardButton({ htmlType, text, onClick, sizeStyles }) {
  return <button type={htmlType} onClick={onClick} style={{
    ...sizeStyles,
    background: "#B09A51",
    backgroundColor: "#B09A51",
    color: "#fff",
    borderRadius: "1.5rem",
    border: "none",
    outline: "none",
    cursor: "pointer"
  }}>{text}</button>
}

function HollowButton({ htmlType, text, onClick, sizeStyles }) {
  return <button type={htmlType} onClick={onClick} style={{
    ...sizeStyles,
    background: "#FFF",
    backgroundColor: "#FFF",
    color: "#B09A51",
    borderRadius: "1.5rem",
    border: "1px solid #B09A51",
    outline: "none",
    cursor: "pointer"
  }}>{text}</button>
}

function GreyedButton({ htmlType, text, onClick, sizeStyles }) {
  return <button type={htmlType} onClick={onClick} style={{
    ...sizeStyles,
    background: "#DFDFDF ",
    backgroundColor: "#DFDFDF",
    color: "#2A3330",
    borderRadius: "1.5rem",
    border: "none",
    outline: "none",
    cursor: "pointer"
  }}>{text}</button>
}

function InvertedButton({ htmlType, text, onClick, sizeStyles }) {
  return <button type={htmlType} onClick={onClick} style={{
    ...sizeStyles,
    background: "#fff",
    backgroundColor: "#fff",
    color: "#B09A51",
    borderRadius: "1.5rem",
    border: "none",
    outline: "none",
    cursor: "pointer"
  }}>{text}</button>
}

function GhostButton({ htmlType, text, onClick, sizeStyles }) {
  return <button type={htmlType} onClick={onClick} style={{
    ...sizeStyles,
    background: "transparent",
    backgroundColor: "transparent",
    color: "#fff",
    borderRadius: "1.5rem",
    border: "1px solid #fff",
    outline: "none",
    cursor: "pointer"
  }}>{text}</button>
}

export const ProductVariantAddToCart = ({ action }) => {
  return (
    <div
      style={{
        width: "50%"
      }}
    >
      <button
        onClick={action}
        style={{
          width: "100px",
          background: "#B09A51",
          backgroundColor: "#B09A51",
          borderRadius: "1rem",
          padding: ".25rem"
        }}
      >
        <span style={{}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="#fff"
              d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
            />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </span>
      </button>
    </div>
  );
};

export const ProductGetSample = ({ action }) => {
  return (
    <button
      onClick={action}
      style={{
        border: "2px solid #B09A51",
        color: "#B09A51",
        borderRadius: "1rem",
        padding: "6px 14px",
        background: "#fff",
        backgroundColor: "#fff"
      }}
    >
      Get a Sample
    </button>
  );
};

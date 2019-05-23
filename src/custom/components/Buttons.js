/**
 * Button components
 *
 */

import React from "react";

/** Common buttons */

export const Button = ({
  type = "standard",
  htmlType = "button",
  text = "Button Text",
  size = "m",
  onClick,
  isSubmitting = false
}) => {
  const sizeStyles = {
    s: { height: "28px", fontSize: "15px", padding: ".25rem .5rem" },
    m: { width: "50%", height: "45px", fontSize: "18px", padding: ".5rem 1rem" },
    l: { width: "95%", height: "50px", fontSize: "20px", padding: ".5rem 1.5rem" }
  }[size];

  if (type === "standard")
    return (
      <StandardButton
        isSubmitting={isSubmitting}
        htmlType={htmlType}
        onClick={onClick}
        text={text}
        sizeStyles={sizeStyles}
      />
    );
  if (type === "hollow")
    return <HollowButton htmlType={htmlType} onClick={onClick} text={text} sizeStyles={sizeStyles} />;
  if (type === "greyed")
    return <GreyedButton htmlType={htmlType} onClick={onClick} text={text} sizeStyles={sizeStyles} />;
  if (type === "inverted")
    return <InvertedButton htmlType={htmlType} onClick={onClick} text={text} sizeStyles={sizeStyles} />;
  if (type === "ghost")
    return <GhostButton htmlType={htmlType} onClick={onClick} text={text} sizeStyles={sizeStyles} />;
};

function StandardButton({ htmlType, text, onClick, sizeStyles, isSubmitting }) {
  return (
    <button
      isSubmitting={isSubmitting}
      type={htmlType}
      onClick={onClick}
      style={{
        ...sizeStyles,
        background: "#B09A51",
        backgroundColor: "#B09A51",
        color: "#fff",
        borderRadius: "1.5rem",
        border: "none",
        outline: "none",
        cursor: "pointer"
      }}
    >
      {text}
    </button>
  );
}

function HollowButton({ htmlType, text, onClick, sizeStyles }) {
  return (
    <button
      type={htmlType}
      onClick={onClick}
      style={{
        ...sizeStyles,
        background: "#FFF",
        backgroundColor: "#FFF",
        color: "#B09A51",
        borderRadius: "1.5rem",
        border: "1px solid #B09A51",
        outline: "none",
        cursor: "pointer"
      }}
    >
      {text}
    </button>
  );
}

function GreyedButton({ htmlType, text, onClick, sizeStyles }) {
  return (
    <button
      type={htmlType}
      onClick={onClick}
      style={{
        ...sizeStyles,
        background: "#DFDFDF ",
        backgroundColor: "#DFDFDF",
        color: "#2A3330",
        borderRadius: "1.5rem",
        border: "none",
        outline: "none",
        cursor: "pointer"
      }}
    >
      {text}
    </button>
  );
}

function InvertedButton({ htmlType, text, onClick, sizeStyles }) {
  return (
    <button
      type={htmlType}
      onClick={onClick}
      style={{
        ...sizeStyles,
        background: "#fff",
        backgroundColor: "#fff",
        color: "#B09A51",
        borderRadius: "1.5rem",
        border: "none",
        outline: "none",
        cursor: "pointer"
      }}
    >
      {text}
    </button>
  );
}

function GhostButton({ htmlType, text, onClick, sizeStyles }) {
  return (
    <button
      type={htmlType}
      onClick={onClick}
      style={{
        ...sizeStyles,
        background: "transparent",
        backgroundColor: "transparent",
        color: "#fff",
        borderRadius: "1.5rem",
        border: "1px solid #fff",
        outline: "none",
        cursor: "pointer"
      }}
    >
      {text}
    </button>
  );
}

export const ProductVariantAddToCart = ({ action }) => {
  const buttonStyles = {
    width: "125px",
    background: "transparent",
    backgroundColor: "transparent",
    border: "2px solid #B09A51",
    borderRadius: "1rem",
    padding: ".75rem 1.25rem",
    color: "#B09A51",
    fontSize: ".8rem",
    fontWeight: 600,
  };

  return (
    <div style={{ width: "100%", textAlign: "right" }}>
      <button onClick={action} style={buttonStyles}>
        <span>Add to Cart</span>
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

export const PlainOptionButton = ({ label, action }) => {
  return (
    <button
      style={{
        background: "#fff",
        color: "#707070",
        border: "1px solid #707070",
        padding: ".75rem 1rem",
        borderRadius: "4px",
        margin: ".5rem"
      }}
      onClick={action}
    >
      {label}
    </button>
  );
};

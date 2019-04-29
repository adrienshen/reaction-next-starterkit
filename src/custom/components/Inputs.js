import React from "react";

export function RoundedTextInput({ width, placeholder, value, onChange }) {
  return (
    <div
      style={{
        width,
      }}
    >
      <input style={{
        borderRadius: "1.5rem",
        border: "2px solid #ECECEC",
        padding: ".65rem 1.25rem",
        outline: "none",
        marginBottom: "1rem",
        fontSize: "1.25rem",
        color: "#4E4E4E",
        fontFamily: "Lato, sans-serif",
        width: "100%",
      }} onChange={onChange} placeholder={placeholder} value={value}
        type="text"
      />
    </div>
  );
}

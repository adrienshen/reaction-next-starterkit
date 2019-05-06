import React from "react";

export function RoundedTextInput({ width, placeholder, value, onChange, type, name }) {
  const inputStyles = {
    borderRadius: "1.5rem",
    border: "2px solid #ECECEC",
    padding: ".65rem 1.25rem",
    outline: "none",
    marginBottom: "2rem",
    fontSize: ".9rem",
    color: "#4E4E4E",
    fontFamily: "Lato, sans-serif",
    width: "100%"
  };
  return (
    <div
      style={{
        width
      }}
    >
      <input
        style={inputStyles}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        type={type || "text"}
        name={name}
      />
    </div>
  );
}

export function OptionsSelect({ dataOptions, onSelect, name, width }) {
  const selectStyle = {
    height: "48px",
    width: "100%",
    border: "2px solid #ECECEC",
    padding: ".5rem 1rem",
    background: "#fff",
    fontSize: "1rem",
  };
  const containerStyles = {
    width: width || "100%",
    marginBottom: "1rem"
  };

  return (
    <div style={containerStyles}>
      <select name={name} style={selectStyle} onBlur={onSelect}>
        {dataOptions.map((option, key) => {
          return <option key={key}>{option}</option>;
        })}
      </select>
    </div>
  );
}

import React from "react";

export const ProductCurrentPrice = ({ price }) => {
  return (
    <span
      style={{
        color: "#B09A51",
        fontSize: "1rem",
        fontWeight: "800",
        fontFamily: "Lato, sans-serif",
        marginRight: "1.5rem",
        marginTop: ".5rem"
      }}
    >
      {price}
    </span>
  );
};

export const ProductDimension = ({ dimension }) => {
  return <span style={{
    fontSize: "15px",
    fontFamily: "Lato, sans-serif",
    color: "#676767",
    marginBottom: "1rem"
  }}>{dimension}</span>;
};

export const ProductVariantTitle = ({ title }) => {
  return <h3 style={{
    marginTop: "0rem",
    color:"#B09A51",
    fontSize: "1rem",
    fontWeight: "400",
    fontFamily: "Lato, sans-serif",
  }}>{title}</h3>
}

export const QuantityNumeral = ({ numeral }) => {
  return <span style={{
    marginRight: "1rem",
    marginLeft: "1rem",
    color: "#4E4E4E",
    fontFamily: "Lato, sans-serif"
  }}>{numeral}</span>
}

export const SubcategoriesLabel = () => <span style={{
  fontFamily: "Lato, sans-serif",
  color:"#B09A51",
  fontWeight: 600,
  fontWeight: "17px"
}}>Subcategories</span>
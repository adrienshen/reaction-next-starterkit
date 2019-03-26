import React from "react";
import Link from "../../components/Link";

/** Common text elements */
export const Body = ({ content = "P needs content", size = "m" }) => {
  const fontSize = { s: "16px", m: "18px", l: "19px" }[size];
  return (
    <p
      style={{
        fontFamily: "Lato, sans-serif",
        fontSize: fontSize,
        color: "#4E4E4E"
      }}
    >
      {content}
    </p>
  );
};

export const H1 = ({ title }) => {
  return (
    <h1
      style={{
        fontFamily: "Lato, sans-serif",
        fontSize: "34px",
        fontWeight: 800
      }}
    >
      {title}
    </h1>
  );
};

export const H2 = ({ title }) => {
  return (
    <h2
      style={{
        fontFamily: "Lato, sans-serif",
        fontSize: "22px",
        fontWeight: 400,
        textAlign: "center"
      }}
    >
      {title}
    </h2>
  );
};

export const UserName = ({ name }) => {
  return (
    <span style={{
      color: "#B09A51",
      fontSize: "16px",
      fontFamily: "Lato, sans-serif",
      fontWeight: 600
    }}>{name}</span>
  )
}

/** Special text elements */
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

export const ComponentSectionTitle = ({ title }) => {
  return (
    <div
      style={{
        width: "100%",
        textAlign: "left",
        padding: "1rem"
      }}
    >
      <span
        style={{
          color: "#4E4E4E",
          fontFamily: "Lato, sans-serif",
          fontSize: "17px"
        }}
      >
        {title}
      </span>
    </div>
  );
};

export const ProductDimension = ({ dimension }) => {
  return (
    <span
      style={{
        fontSize: "15px",
        fontFamily: "Lato, sans-serif",
        color: "#676767",
        marginBottom: "1rem"
      }}
    >
      {dimension}
    </span>
  );
};

export const ProductVariantTitle = ({ title }) => {
  return (
    <h3
      style={{
        marginTop: "0rem",
        color: "#B09A51",
        fontSize: "1rem",
        fontWeight: "400",
        fontFamily: "Lato, sans-serif",
        width: "100%"
      }}
    >
      {title}
    </h3>
  );
};

export const QuantityNumeral = ({ numeral }) => {
  return (
    <span
      style={{
        marginRight: "1rem",
        marginLeft: "1rem",
        color: "#4E4E4E",
        fontFamily: "Lato, sans-serif"
      }}
    >
      {numeral}
    </span>
  );
};

export const SubcategoriesLabel = () => (
  <span
    style={{
      fontFamily: "Lato, sans-serif",
      color: "#B09A51",
      fontWeight: 600,
      fontWeight: "17px"
    }}
  >
    Subcategories
  </span>
);

/**
 * Samples
 */

export const RadioLabel = ({ title, index, productIndexSelected }) => (
  <div
    style={{
      width: "100%",
      textAlign: "center",
      marginBottom: "1rem"
    }}
  >
    <input checked={index === productIndexSelected} id="sampleItem" name="sampleItem" type="radio" />
    <label for="sampleItem">{title}</label>
  </div>
);

export const SampleOriginalPrice = ({ price }) => {
  return (
    <span
      style={{
        color: "#C6C6C6",
        fontSize: "13px",
        fontFamily: "Lato, sans-serif",
        textDecoration: "line-through",
        marginRight: ".5rem"
      }}
    >
      {price}
    </span>
  );
};

export const SamplePrice = ({ price }) => {
  return (
    <span
      style={{
        color: "#FF6F6F",
        fontSize: "14px",
        fontFamily: "Lato, sans-serif"
      }}
    >
      {price}
    </span>
  );
};

export const WishListTitle = ({ title }) => {
  return (
    <span
      style={{
        color: "#B09A51",
        fontSize: "17px",
        fontFamily: "Lato, sans-serif"
      }}
    >
      {title}
    </span>
  );
};
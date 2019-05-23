import React, { Fragment } from "react";
// import Link from "../../components/Link";

export const Body = ({ content = "P needs content", size = "m" }) => {
  const fontSize = { s: "16px", m: "18px", l: "19px" }[size];
  return (
    <p
      style={{
        fontFamily: "Lato, sans-serif",
        fontSize,
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
    <span
      style={{
        color: "#B09A51",
        fontSize: "16px",
        fontFamily: "Lato, sans-serif",
        fontWeight: 600
      }}
    >
      {name}
    </span>
  );
};

export const ProductPrices = ({ originalPrice, currentPrice }) => {
  const styles = {
    currentPrice: {
      color: "#B09A51",
      fontSize: ".85rem",
      fontWeight: "800",
      fontFamily: "Lato, sans-serif",
      marginTop: ".5rem",
      textAlign: "right",
      width: "20%"
    },
    originalPrice: {
      color: "#808080",
      fontSize: ".75rem",
      fontWeight: 400,
      fontFamily: "Lato, sans-serif",
      marginTop: ".5rem",
      textAlign: "right",
      width: "20%",
      textDecoration: "line-through",
      marginRight: "4px",
    }
  };
  return (
    <Fragment>
      <span style={styles.originalPrice}>{originalPrice}</span>
      <span style={styles.currentPrice}>{currentPrice}</span>
    </Fragment>
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

export const PersonalSectionTitle = ({ title }) => {
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
          fontFamily: "Lato, sans-serif",
          fontSize: "17px",
          color: "#B09A51",
          fontWeight: 600
        }}
      >
        {title}
      </span>
    </div>
  );
};

const fullTextStyles = {
  fontSize: "12px",
  fontFamily: "Lato, sans-serif",
  color: "#676767",
  width: "100%",
  height: "0px"
};

export const ProductDimension = ({ dimension }) => {
  return (
    <span
      style={fullTextStyles}
    >
      Dimensions: {dimension}
    </span>
  );
};

export const SkuDetails = ({ sku }) => {
  return (
    <span
      style={fullTextStyles}
    >
      SKU: {sku}
    </span>
  );
};

export const ProductVariantTitle = ({ title }) => {
  return (
    <h3
      style={{
        marginTop: ".5rem",
        color: "#B09A51",
        fontSize: "1rem",
        fontWeight: "400",
        fontFamily: "Lato, sans-serif",
        width: "100%",
        marginBottom: 0
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
        fontFamily: "Lato, sans-serif",
        marginBottom: "1rem",
        display: "inline-block",
        marginBottom: ".5rem"
      }}
    >
      {title}
    </span>
  );
};

/* Orders */

export const OrderNumber = ({ id }) => {
  return (
    <div
      style={{
        color: "#B09A51",
        fontFamily: "Lato, sans-serif",
        marginBottom: "1rem",
        fontSize: "16px"
      }}
    >
      Order No: {id}
    </div>
  );
};

export const OrderItemRow = ({ label, value }) => {
  return (
    <div
      style={{
        fontFamily: "Lato, sans-serif",
        marginBottom: ".25rem",
        fontSize: "14px"
      }}
    >
      <span
        style={{
          color: "#C6C6C6",
          display: "inline-block",
          width: "50%"
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: "#4E4E4E"
        }}
      >
        {value}
      </span>
    </div>
  );
};

export const TotalAmount = ({ amount }) => {
  return (
    <div
      style={{
        marginTop: "2rem",
        textAlign: "right",
        fontFamily: "Lato, sans-serif"
      }}
    >
      <span
        style={{
          marginRight: "4rem"
        }}
      >
        Total Price:
      </span>
      <span
        style={{
          color: "#B09A51"
        }}
      >
        {amount}
      </span>
    </div>
  );
};

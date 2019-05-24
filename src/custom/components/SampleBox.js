import React from "react";
import Colors from "../../lib/theme/colors";

/**
 * Sample box with 1 or 2 choices
 *
 */
export default ({ select, selected }) => {
  const sampleChoices = [
    {
      title: "Sample A",
      image: "https://via.placeholder.com/100x130",
      price: {
        original: "11.99",
        current: "9.99"
      }
    },
    {
      title: "Sample B",
      image: "https://via.placeholder.com/100x130",
      price: {
        original: "13.99",
        current: "11.99"
      }
    }
  ];

  const sampleStyles = {
    display: "flex",
    flexFlow: "column nowrap",
    marginBottom: "1rem",
    width: "48%",
    padding: ".5rem 1rem",
    border: `1px solid ${Colors.GOLD}`,
    borderRadius: `4px`,
  };

  const imageStyles = {
    marginBottom: ".5rem"
  };

  return (
    <section
      style={{
        display: "flex",
        flexFlow: "row no-wrap",
        justifyContent: "space-between",
        marginBottom: "1rem"
      }}
    >
      {sampleChoices.map((sample, key) => {
        return (
          <div onClick={() => select(key)} key={key}
            style={{
              ...sampleStyles,
              border: (selected===key) ? `1.5px solid ${Colors.GOLD}` : `1.5px solid #808080`
            }}>
            <H3 title={sample.title} />
            <img style={imageStyles} src={sample.image || "https://via.placeholder.com/120x100"} alt="product" />
            <Prices prices={sample.price} />
          </div>
        );
      })}
    </section>
  );
};

function H3({ title }) {
  console.log("title: ", title);
  return (
    <h3
      style={{
        color: "#4E4E4E",
        fontFamily: "Lato, sans-serif",
        fontSize: "1rem",
        marginTop: 0,
        marginBottom: ".5rem",
        fontWeight: "normal"
      }}
    >
      {title}
    </h3>
  );
}

function Prices({ prices } = null) {
  console.log("prices: ", prices);

  if (prices === null || !prices) {
    return null;
  }

  const styles = {
    original: {
      color: "#aaa",
      fontFamily: "Lato, sans-serif",
      fontSize: ".8rem",
      fontWeight: 600,
      textDecoration: "line-through",
      marginRight: ".5rem"
    },
    current: {
      color: "#B09A51",
      fontFamily: "Lato, sans-serif",
      fontSize: ".9rem",
      fontWeight: 600
    }
  };

  return (
    <div>
      <span style={styles.original}>$ {prices.original}</span>
      <span style={styles.current}>$ {prices.current}</span>
    </div>
  );
}

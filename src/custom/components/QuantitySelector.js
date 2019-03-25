import React, { PureComponent } from "react";
import { QuantityNumeral } from "../../custom/components/Text";
import RenderError from "./RenderError";

const styles = {
  container: {
    marginBottom: "1rem",
    width: "100%"
  },
  incrementDecrementButtons: {
    borderRadius: "50%",
    color: "#fff",
    padding: "4px",
    width: "30px",
    height: "30px",
    fontWeight: 600,
    background: "#B09A51",
    fontWeight: 600,
    fontSize: "18px",
    textAlign: "center",
    outline: "none",
  },
  quantityNumber: {
    margin: ".5rem",
    color: "#4E4E4E",
    fontFamily: "Lato, sans-serif",
    fontSize: "12px"
  }
};

export default class QuantitySelector extends PureComponent {
  render() {
    try {
      const { increment, decrement, quantity, align = "center" } = this.props;
      return (
        <div style={{ ...styles.container, textAlign: align }}>
          <button onClick={increment} style={styles.incrementDecrementButtons}>
            &#8722;
          </button>
          <QuantityNumeral numeral={quantity} />
          <button onClick={decrement} style={styles.incrementDecrementButtons}>
            &#43;
          </button>
        </div>
      );
    } catch (err) {
      return <RenderError />;
    }
  }
}

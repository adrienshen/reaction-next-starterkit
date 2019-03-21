import React, { PureComponent } from "react";
import { ProductVariantThumbnail } from "./Images";
import { ProductDimension, ProductCurrentPrice, ProductVariantTitle } from "./Text";
import QuantitySelector from "./QuantitySelector";
import { ProductVariantAddToCart } from "./Buttons";

const styles = {
  container: {
    padding: "1rem",
    width: "90%",
    border: "1px solid #ECECEC",
    margin: "1rem",
    display: "flex",
    flexFlow: "row wrap",
  },
  inner: {
    display: "flex",
    width: "auto"
  },
  lastRow: {
    display: "flex",
    width: "100%"
  },
  content: {
    width: "65%",
    paddingLeft: "1rem",
    display: "flex",
    flexFlow: "row wrap"
  }
};

export default class VariantOptionBox extends PureComponent {
  render() {
    try {
      const { product } = this.props;
      console.log("product: ", product);
      return (
        <div style={styles.container}>
          <ProductVariantTitle title={`24" Deep Double Full Height Door`} />
          <ProductVariantThumbnail src="" />
          <div style={styles.content}>
            <ProductDimension dimension={`36"w x 34"h x 24"d`} />
            <QuantitySelector
              quantity={1}
              increment={() => console.log("increment")}
              decrement={() => console.log("decrement")}
            />
            <ProductCurrentPrice price="1,099" />
            <ProductVariantAddToCart action={() => alert("add to cart")} />
          </div>
        </div>
      );
    } catch (err) {
      console.error(err, "was an error...");
      return <div>something happended</div>;
    }
  }
}

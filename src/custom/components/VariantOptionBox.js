import React, { PureComponent } from "react";
import { ProductVariantThumbnail } from "./Images";
import { ProductDimension, ProductCurrentPrice, ProductVariantTitle } from "./Text";
import QuantitySelector from "./QuantitySelector";
import { ProductVariantAddToCart } from "./Buttons";
import RenderError from "../../custom/components/RenderError";

const styles = {
  container: {
    padding: ".5rem",
    width: "90%",
    border: "1px solid #ECECEC",
    margin: "1rem",
    display: "flex",
    flexFlow: "row wrap"
  },
  content: {
    width: "65%",
    paddingLeft: "1rem",
    display: "flex",
    flexFlow: "row wrap"
  }
};

export default class VariantOptionBox extends PureComponent {
  renderVariantWithOptions(variant) {
    try {
      if (variant.options && variant.options.length) {
        return [1, 2, 3].map(() => {
          return this.renderFinalOption();
        });
      }

      return this.renderFinalOption();
    } catch (err) {
      console.error("err: ", err);
      return <RenderError componentName="this.renderVariantWithOptions" />;
    }
  }

  renderFinalOption() {
    const product = {
      title: `Temporary Product Title`,
      dimension: `10"w x 10"h x 10"d`,
      price: `$ 10.97`,
      thumbnail: "https://loremflickr.com/110/110/dog",
      soldOut: false,
    }

    if (product.soldOut) {
      return null;
    }

    return (
      <div style={styles.container}>
        <ProductVariantTitle title={product.title} />
        <ProductVariantThumbnail src={product.thumbnail || ""} />
        <div style={styles.content}>
          <ProductDimension dimension={product.thumbnail} />

          <QuantitySelector
            quantity={0}
            increment={() => console.log("increment")}
            decrement={() => console.log("decrement")}
          />
          <ProductCurrentPrice price={product.price} />
        </div>
        <ProductVariantAddToCart action={() => console.log("ADD TO CART")} />
      </div>
    );
  }

  render() {
    try {
      const { product } = this.props;
      const { variants } = product;

      // console.log("top level product: ", product);

      // RC makes sure there is at least one variant
      return variants.map((variant, key) => {
        return this.renderVariantWithOptions(variant, key);
      });
    } catch (err) {
      console.error(err, "was an error...");
      return <RenderError componentName="VariantOptionBox" />;
    }
  }
}

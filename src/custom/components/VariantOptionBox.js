import React, { PureComponent } from "react";
import { ProductVariantThumbnail } from "./Images";
import { ProductDimension, ProductCurrentPrice, ProductVariantTitle } from "./Text";
import QuantitySelector from "./QuantitySelector";
import { ProductVariantAddToCart } from "./Buttons";
import RenderError from "../../custom/components/RenderError";

const styles = {
  container: {
    padding: "1rem",
    width: "90%",
    border: "1px solid #ECECEC",
    margin: "1rem",
    display: "flex",
    flexFlow: "row wrap"
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
      const { variants } = product;

      console.log("top level product: ", product);

      // RC makes sure there is at least one variant
      return variants.map((variant, key) => {
        return this.renderVariantWithOptions(variant, key);
      });
    } catch (err) {
      console.error(err, "was an error...");
      return <RenderError componentName="VariantOptionBox" />
    }
  }

  renderVariantWithOptions(variant) {
    try {
      const dimensions = {
        width: variant.width,
        height: variant.height,
        depth: variant.length,
        weight: variant.weight
      };
      
      let variantThumbnail = "";
      if (variant && variant.media && variant.media[0] && variant.media[0].URLs && variant.media[0].URLs.thumbnail) {
        variantThumbnail = variant.media[0].URLs.thumbnail;
      }

      if (variant.options && variant.options.length) {
        return variant.options.map(option => {
          return this.renderFinalOption(option, dimensions);
        });
      } else {
        return this.renderFinalOption(variant, dimensions, "");
      }
    } catch(err) {
      console.error("err: ", err);
      return <RenderError componentName="this.renderVariantWithOptions" />
    }
  }

  renderFinalOption(productOptionVariant, dimensions, variantThumbnail) {
    // console.log("productOptionVariant.media[0].URLs: ", productOptionVariant.media)
    let thumbnail = "";
    if (productOptionVariant.media && productOptionVariant.media.length && productOptionVariant.media[0].URLs && productOptionVariant.media[0].URLs.thumbnail) {
      thumbnail = productOptionVariant.media[0].URLs.thumbnail;
    } else {
      thumbnail = "";
    }
    if (productOptionVariant.isSoldOut) return null;
    return (
      <div style={styles.container}>
        <ProductVariantTitle title={productOptionVariant.title} />
        <ProductVariantThumbnail src={thumbnail || variantThumbnail || ""} />
        <div style={styles.content}>
          <ProductDimension
            dimension={`${dimensions.width}"w x ${dimensions.height}"h x ${dimensions.depth}"d`} />
          <QuantitySelector
            quantity={0}
            increment={() => console.log("increment")}
            decrement={() => console.log("decrement")}
          />
          <ProductCurrentPrice price={productOptionVariant.pricing[0].displayPrice} />
          <ProductVariantAddToCart action={() => alert("add to cart")} />
        </div>
      </div>
    );
  }
}

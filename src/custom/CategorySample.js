import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { SampleCenterImage } from "./components/Images";
import { RadioLabel, SampleOriginalPrice, SamplePrice } from "./components/Text";
import { Router } from "routes";

const styles = theme => ({
  container: {},
  samplesGrid: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center"
  }
});

@withStyles(styles, { name: "OCCategorySample" })
class CategorySample extends Component {
  static propTypes = {
    classes: PropTypes.object
  };

  state = {
    productIndexSelected: 0
  }

  componentDidMount() {
    console.log("this.propss : ", this.props);
  }

  selectSampleItem = (value) => {
    console.log("index: ", value);

    this.setState({ productIndexSelected: value });
  }

  renderSampleSelection() {
    const { variants } = this.props.product;
    return variants.map((sample, index) => {
      return <SampleItem
                productIndexSelected={this.state.productIndexSelected}
                index={index}
                selectSampleItem={this.selectSampleItem}
                sample={sample} />;
    });
  }

  handleAddCart = () => {
    // Router.pushRoute(`/samples/${this.props.product.variants[this.state.productIndexSelected].variantId}`);
    console.log("Add to cart: ", this.props.product.variants[this.state.productIndexSelected].variantId);
  }

  renderAddToCart() {
    return (
      <button
        onClick={this.handleAddCart}
        style={{
          background: "#B09A51",
          color: "#fff",
          borderRadius: "1.5rem",
          textTransform: "uppercase",
          border: "none",
          padding: "1rem 2rem",
          fontSize: "1.2rem"
        }}
      >
        ADD TO CART
      </button>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <section>Color Filter</section>
        <section className={classes.samplesGrid}>{this.renderSampleSelection()}</section>
        <section className={classes.samplesGrid}>{this.renderAddToCart()}</section>
      </Fragment>
    );
  }
}

const SampleItem = ({ selectSampleItem, sample, index, productIndexSelected }) => {
  return (
    <div
      onClick={() => selectSampleItem(index)}
      style={{
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        marginBottom: "1rem",
        margin: "2.5rem",
        cursor: "pointer"
      }}
    >
      <RadioLabel productIndexSelected={productIndexSelected} index={index} title={sample.title} />
      <SampleCenterImage src={sample.media.length && sample.media[0].URLs.original} />
      <div
        style={{
          display: "inline-block",
          textAlign: "center"
        }}
      >
        <SampleOriginalPrice price={sample.pricing.length ? sample.pricing[0].compareAtPrice.displayAmount : "$0.00"} />
        <SamplePrice price={sample.pricing.length ? sample.pricing[0].displayPrice : "$0.00"} />
      </div>
    </div>
  );
};

export default CategorySample;

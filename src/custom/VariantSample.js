import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SampleBox from "./components/SampleBox";

const styles = theme => ({
  container: {},
  samplesGrid: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center"
  }
});

@withStyles(styles, { name: "OCSamVariantple" })
class VariantSample extends Component {
  static propTypes = {
    classes: PropTypes.object
  };

  state = {

  }

  componentDidMount() {
    console.log("this.propss : ", this.props);
  }

  selectSampleItem = (value) => {
    console.log("index: ", value);

    this.setState({ productIndexSelected: value });
  }

  renderSampleSelection() {
    return <SampleItem />
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
    const { classes, product } = this.props;

    return (
      <Fragment>
        <section className={classes.samplesGrid}>{this.renderSampleSelection()}</section>
        <section className={classes.samplesGrid}>{this.renderAddToCart()}</section>
      </Fragment>
    );
  }
}

const SampleItem = ({ selectSampleItem, index }) => {
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
      <SampleBox price="$9.99" title="Sample Title" />
      <div>Quantity Selector</div>

      
    </div>
  );
};

export default VariantSample;

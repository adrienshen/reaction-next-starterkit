import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SampleBox from "./components/SampleBox";
import DetailTabs from "./DetailTabs";
import QuantitySelector from "./components/QuantitySelector";

const styles = theme => ({
  container: {},
  samplesGrid: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center"
  },
  addToCart: {
    position: "absolute",
    bottom: 100,
    background: "#B09A51",
    color: "#fff",
    borderRadius: "1.5rem",
    textTransform: "uppercase",
    border: "none",
    padding: "1rem 2rem",
    fontSize: "1.2rem",
    outline: "none"
  }
});

@withStyles(styles, { name: "OCSamVariantple" })
class VariantSample extends Component {
  static propTypes = {
    classes: PropTypes.object
  };

  state = {
    tabSelected: "FEATURES"
  };

  componentDidMount() {
    console.log("this.propss : ", this.props);
  }

  selectSampleItem = value => {
    console.log("index: ", value);

    this.setState({ productIndexSelected: value });
  };

  selectTab = value => {
    this.setState({
      tabSelected: value
    });
  };

  findVariantToDisplay() {
    const { product, variantId } = this.props;
    // console.log("findVariantToDisplay :", product, variantId);
    
    let optionFounded = null;
    product.variants.forEach(variant => {
      variant.options.forEach(option => {
        if (option.variantId === variantId) {
          optionFounded = option;
        }
      })
    });

    // console.log("option founded? ", optionFounded);
    return optionFounded;
  }

  renderSampleSelection() {
    const { product } = this.props;

    return (
      <SampleVariant
        variant={this.findVariantToDisplay()}
        product={product}
        tabSelected={this.state.tabSelected}
        selectTab={this.selectTab}
      />
    );
  }

  handleAddCart = () => {
    console.log("Add to cart: $id");
  };

  renderAddToCart() {
    const { classes } = this.props;
    return (
      <button onClick={this.handleAddCart} className={classes.addToCart}>
        ADD TO CART
      </button>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <section className={classes.samplesGrid}>{this.renderSampleSelection()}</section>
        <section className={classes.samplesGrid}>{this.renderAddToCart()}</section>
      </Fragment>
    );
  }
}

const SampleVariant = ({ variant, selectTab, tabSelected, product }) => {
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        width: "100vw",
        margin: "1.5rem 1rem",
        cursor: "pointer"
      }}
    >
      <section style={{ marginBottom: "1rem" }}>
        <SampleBox
          imageSource={
            variant && variant.primaryImage && variant.primaryImage.URLs && variant.primaryImage.URLs.thumbnail
          }
          price={variant && variant.pricing.length && variant.pricing[0].displayPrice}
          title={variant && variant.title}
        />
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <QuantitySelector
          align="center"
          increment={() => console.log("I")}
          decrement={() => console.log("D")}
          quantity={0}
        />
      </section>

      <DetailTabs product={product} selectTab={selectTab} tabSelected={tabSelected} />
    </div>
  );
};

export default VariantSample;

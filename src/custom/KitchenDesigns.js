import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { SampleCenterImage } from "./components/Images";
import { RadioLabel, SampleOriginalPrice, SamplePrice, ComponentSectionTitle } from "./components/Text";
import { Router } from "routes";
import FilterColor from "./components/FilterColor";
import Link from "../components/Link";

const styles = () => ({
  container: {},
  samplesGrid: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center"
  }
});

@withStyles(styles, { name: "OCKitchenDesigns" })
class KitchenDesigns extends Component {
  static propTypes = {
    classes: PropTypes.object
  };

  state = {
    productIndexSelected: 0,
    colorFilterSelected: null
  };

  componentDidMount() {
    console.log("this.propss : ", this.props);
  }

  selectSampleItem = variantId => {
    console.log("index selected: ", variantId);

    Router.push(`/samples/${variantId}`);
  };

  renderSampleSelection() {
    const { variants } = this.props.product;
    let displayVariants = variants;
    if (this.state.colorFilterSelected) {
      console.log("should filter by: ", this.state.colorFilterSelected);
      displayVariants = variants.filter(elem => {
        return elem.variantId === this.state.colorFilterSelected.variantId;
      });
    }
    return displayVariants.map(variant => {
      return this.renderFinalOption(variant.options);
    });
  }

  renderFinalOption(variantOptions) {
    return variantOptions.map(option => {
      return (
        <KitchenSampleItem
          productIndexSelected={this.state.productIndexSelected}
          index={option.variantId}
          selectSampleItem={this.selectSampleItem}
          sample={option}
        />
      );
    });
  }

  handleAddCart = () => {
    console.log("Add to cart: ", this.props.product.variants[this.state.productIndexSelected].variantId);
  };

  selectDesignColor = color => {
    console.log("color selected: ", color);

    this.setState({
      colorFilterSelected: color
    });
  };

  getColorFilters(variants) {
    return variants.map(variantColor => {
      return {
        code: variantColor.title.toLowerCase().replace(/ +/g, "_"),
        patternLabel: variantColor.title,
        patternUrl: variantColor.primaryImage.URLs.thumbnail,
        fromCms: true,
        variantId: variantColor.variantId
      };
    });
  }

  renderColorFilter() {
    console.log("this.props: ", this.props);

    const {
      product: { variants }
    } = this.props;

    console.log("variants: ", this.getColorFilters(variants));

    return (
      <Fragment>
        <ComponentSectionTitle title="Filter by Color" />
        <FilterColor
          colorFilters={this.getColorFilters(variants)}
          colorFilterSelected={this.state.colorFilterSelected}
          selectDesignColor={this.selectDesignColor}
        />
      </Fragment>
    );
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

    console.log("this.props: ", this.props);

    return (
      <Fragment>
        Kitchen designs, onhold
        {/* <section>{this.renderColorFilter()}</section>
        <section className={classes.samplesGrid}>{this.renderSampleSelection()}</section>
        <section className={classes.samplesGrid}>{this.renderAddToCart()}</section> */}
      </Fragment>
    );
  }
}

const KitchenSampleItem = ({ selectSampleItem, sample, index, productIndexSelected }) => {
  // console.log("sample: ", sample);
  const itemStyles = {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    marginBottom: "1rem",
    margin: "2.5rem",
    cursor: "pointer"
  };
  return (
    <Link href="/">
      <div
        key={index}
        style={itemStyles}
      >
        <h2>{sample.title}</h2>
        <SampleCenterImage src={sample.media.length && sample.media[0].URLs.original} />
      </div>
    </Link>
  );
};

export default KitchenDesigns;

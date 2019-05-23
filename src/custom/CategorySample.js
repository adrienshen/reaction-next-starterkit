import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { SampleCenterImage } from "./components/Images";
import { RadioLabel, SampleOriginalPrice, SamplePrice, ComponentSectionTitle } from "./components/Text";
import { Router } from "routes";
import FilterColor from "./components/FilterColor";

const styles = theme => ({
  container: {},
  samplesGrid: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center"
  },
});

@withStyles(styles, { name: "OCCategorySample" })
class CategorySample extends Component {
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
        <SampleItem
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

    return (
      <Fragment>
        <section className={classes.samplesGrid}>{this.renderSampleSelection()}</section>
        <section className={classes.samplesGrid}>{this.renderAddToCart()}</section>
      </Fragment>
    );
  }
}

const SampleItem = ({ selectSampleItem, sample, index, productIndexSelected }) => {
  const sampleItemStyles = {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    marginBottom: "1rem",
    margin: "2.5rem",
    cursor: "pointer"
  }

  return (
    <div
      key={index}
      onClick={() => selectSampleItem(index)}
      style={sampleItemStyles}
    >
      <RadioLabel productIndexSelected={productIndexSelected} index={index} title={sample.title} />
      <SampleCenterImage src={sample.media.length && sample.media[0].URLs.original} />
      <div
        style={{
          display: "inline-block",
          textAlign: "center"
        }}
      >
        <SampleOriginalPrice
          price={sample.pricing[0].compareAtPrice ? sample.pricing[0].compareAtPrice.displayAmount : "$0.00"}
        />
        <SamplePrice price={sample.pricing.length ? sample.pricing[0].displayPrice : "$0.00"} />
      </div>
    </div>
  );
};

export default CategorySample;

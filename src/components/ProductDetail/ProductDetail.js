import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import { inject, observer } from "mobx-react";
import track from "lib/tracking/track";
import MediaGallery from "components/MediaGallery";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import VariantOptionBox from "../../custom/components/VariantOptionBox";
import SampleBox from "../../custom/components/SampleBox";
import { ProductGetSample } from "../../custom/components/Buttons";
import DetailTabs from "../../custom/DetailTabs";
import FilterColor from "../../custom/components/FilterColor";
import { ComponentSectionTitle } from "../../custom/components/Text";

const styles = theme => ({
  section: {
    marginBottom: theme.spacing.unit * 2
  },
  breadcrumbGrid: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  },
  info: {
    marginBottom: theme.spacing.unit
  },
  renderTabsSection: {
    width: "100%"
  },
  buttons: {
    width: "100%",
    display: "flex"
  },
  buttonTabs: {
    width: "50%",
    border: "none",
    fontSize: "1rem",
    textTransform: "uppercase",
    outline: "none",
    paddingBottom: "1rem",
    background: "#fff",
    backgroundColor: "#fff"
  },
  contentContainer: {
    padding: "2rem 1rem"
  },
  selectContainer: {
    width: "100%",
    padding: "1rem"
  },
  filterSelect: {
    width: "100%",
    height: "48px",
    border: "2px solid #ddd",
    paddingLeft: "2rem",
    background: "#fff",
    outline: "none"
  },
  filterOption: {}
});

/**
 * Product detail component
 * @name ProductDetail
 * @param {Object} props Component props
 * @returns {React.Component} React component node that represents a product detail view
 */
@withWidth({ initialWidth: "md" })
@withStyles(styles, { withTheme: true, name: "SkProductDetail" })
@inject("routingStore", "uiStore")
@track()
@observer
class ProductDetail extends Component {
  static propTypes = {
    /**
     * Function to add items to a cart.
     * Implementation may be provided by addItemsToCart function from the @withCart decorator
     *
     * @example addItemsToCart(CartItemInput)
     * @type Function
     */
    addItemsToCart: PropTypes.func,
    classes: PropTypes.object,
    currencyCode: PropTypes.string.isRequired,
    product: PropTypes.object,
    routingStore: PropTypes.object.isRequired,
    shop: PropTypes.object.isRequired,
    theme: PropTypes.object,
    uiStore: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired
  };

  state = {
    colorFilterSelected: null,
    // needs to be moved to admin
    colorFilters: [
      { code: "soft_white", patternLabel: "Soft White", patternUrl: "#eee" },
      { code: "oak_wood", patternLabel: "Oak Wood", patternUrl: "wood.png" },
      { code: "red", patternLabel: "Red", patternUrl: "red.png" },
      { code: "brown", patternLabel: "Brown", patternUrl: "brown.png" },
      { code: "dark", patternLabel: "Dark", patternUrl: "dark.png" }
    ],
    tabSelected: "DETAILS",
    sampleSelected: 0,
    subCategorySelected: ["wall", "base", "tall", "pantry"]
  };

  componentDidMount() {
    console.log("ComponentDidMount");
  }

  /**
   * @name handleSelectVariant
   * @summary Called when a variant is selected in the variant list
   * @private
   * @ignore
   * @param {Object} variant The variant object that was selected
   * @returns {undefined} No return
   */
  handleSelectVariant = variant => {
    this.selectVariant(variant);
  };

  /**
   * @name handleAddToCartClick
   * @summary Called when the add to cart button is clicked
   * @private
   * @ignore
   * @param {Number} quantity - A positive integer from 0 to infinity, representing the quantity to add to cart
   * @returns {undefined} No return
   */
  handleAddToCartClick = async quantity => {
    console.log("Adding to cart... ", quantity);
  };

  selectDesignColor(color) {
    // console.log("color selected: ", color);
    this.setState({
      colorFilterSelected: color
    });
  }

  identifyImagePathString(patternUrl) {
    return patternUrl.indexOf("png") > -1;
  }

  renderColorSelect() {
    const { colorFilters, colorFilterSelected } = this.state;
    try {
      return (
        <FilterColor
          colorFilters={colorFilters}
          colorFilterSelected={colorFilterSelected}
          selectDesignColor={this.selectDesignColor}
        />
      );
    } catch (err) {
      console.error("Error: ", err);
    }
  }

  handleGetSampleClick() {
    console.log("GET SAMPLE");
  }

  selectSample = (index) => {
    this.setState({ sampleSelected: index });
  }

  renderSampleBox() {
    return (
      <section
        style={{
          padding: "1rem",
          width: "100%",
          textAlign: "center"
        }}
      >
        <SampleBox select={this.selectSample} selected={this.state.sampleSelected} />
        <ProductGetSample action={this.handleGetSampleClick} />
      </section>
    );
  }

  selectTab = tab => {
    this.setState({
      tabSelected: tab
    });
  };

  renderTabDetails() {
    const { product } = this.props;
    return <DetailTabs product={product} selectTab={this.selectTab} tabSelected={this.state.tabSelected} />;
  }

  handleSubCategorySelect = value => {
    let nextList = this.state.subCategorySelected;
    const index = this.state.subCategorySelected.indexOf(value);
    if (index > -1) {
      nextList.splice(index, 1);
    } else {
      nextList = this.state.subCategorySelected.concat([value]);
    }
    this.setState({
      subCategorySelected: nextList
    });
  };

  renderCheckboxControl(controlValue, key) {
    console.log("controlValue: ", controlValue in this.state.subCategorySelected);
    return (
      <FormControlLabel
        key={key}
        control={
          <Checkbox
            checked={this.state.subCategorySelected.indexOf(controlValue) !== -1}
            onChange={() => this.handleSubCategorySelect(controlValue)}
            value={controlValue}
          />
        }
        label={controlValue.toUpperCase()}
      />
    );
  }

  renderCategorySelect(categoryObj) {
    const { classes } = this.props;
    return (
      <div className={classes.selectContainer}>
        <select
          style={{
            color: "#808080",
            fontSize: "1rem",
            paddingLeft: "1rem"
          }}
          value=""
          defaultValue=""
          className={classes.filterSelect}
        >
          <option value="" disabled>
            {categoryObj.category}
          </option>
          {categoryObj.options.map((elem, key) => {
            return this.renderOption(elem, key);
          })}
        </select>
      </div>
    );
  }

  renderOption(option, key) {
    return (
      <option key={key} value={option.value}>
        {option.label}
      </option>
    );
  }

  renderAttributeChoices() {
    try {
      const { classes } = this.props;
      return (
        <section className={classes.section}>
          <ComponentSectionTitle title="Filter cabinets by dimensions" gold={true} />
          <div className={classes.categoryFilters}>
            {this.renderCategorySelect({
              category: "Width",
              options: [{ value: 20, label: "20" }, { value: 21, label: "21" }]
            })}
            {this.renderCategorySelect({
              category: "Height",
              options: [{ value: 20, label: "20" }, { value: 21, label: "21" }]
            })}
            {this.renderCategorySelect({
              category: "Depth",
              options: [{ value: 20, label: "20" }, { value: 21, label: "21" }]
            })}
          </div>
        </section>
      );
    } catch (err) {
      console.error("err: ", err);
      return <div>error here</div>;
    }
  }

  renderVariantBox(product) {
    return <VariantOptionBox product={product} />;
  }

  render() {
    const {
      classes,
      product,
      uiStore: { pdpSelectedOptionId, pdpSelectedVariantId }
    } = this.props;

    // console.log("color selected: ", this.state);

    // Set the default media as the top-level product's media
    // (all media on all variants and objects)
    let pdpMediaItems = product.media;

    // If we have a selected variant (we always should)
    // check to see if media is available, and use this media instead
    // Revert to original media if variant doesn't have specific media
    const selectedVariant = product.variants.find(variant => variant._id === pdpSelectedVariantId);
    if (selectedVariant) {
      if (selectedVariant.media && selectedVariant.media.length) {
        pdpMediaItems = selectedVariant.media;
      }

      // If we have a selected option, do the same check
      // Will revert to variant check if no option media is available
      if (Array.isArray(selectedVariant.options) && selectedVariant.options.length) {
        const selectedOption = selectedVariant.options.find(option => option._id === pdpSelectedOptionId);
        if (selectedOption) {
          if (selectedOption.media && selectedOption.media.length) {
            pdpMediaItems = selectedOption.media;
          }
        }
      }
    }

    return (
      <Fragment>
        <div className={classes.section}>
          <MediaGallery mediaItems={pdpMediaItems} />
        </div>

        <div className={classes.section}>
          {/* {this.renderColorSelect()} */}
          {this.renderSampleBox()}
        </div>

        <div className={classes.section}>{this.renderTabDetails()}</div>

        {this.renderAttributeChoices()}

        <div className={classes.variantOptionList}>{this.renderVariantBox(product)}</div>
      </Fragment>
    );
  }
}

export default ProductDetail;

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import { inject, observer } from "mobx-react";
import track from "lib/tracking/track";
// import ProductDetailAddToCart from "components/ProductDetailAddToCart";
import ProductDetailTitle from "components/ProductDetailTitle";
import VariantList from "components/VariantList";
import ProductDetailVendor from "components/ProductDetailVendor";
import ProductDetailDescription from "components/ProductDetailDescription";
import ProductDetailPrice from "components/ProductDetailPrice";
import MediaGallery from "components/MediaGallery";
import { Router } from "routes";
import priceByCurrencyCode from "lib/utils/priceByCurrencyCode";
import variantById from "lib/utils/variantById";
// import trackProduct from "lib/tracking/trackProduct";
// import TRACKING from "lib/tracking/constants";
import trackCartItems from "lib/tracking/trackCartItems";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { SubcategoriesLabel } from "../../custom/components/Text";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import VariantOptionBox from "../../custom/components/VariantOptionBox";

// const { CART_VIEWED, PRODUCT_ADDED, PRODUCT_VIEWED } = TRACKING;

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
    colorFilters: [
      { code: "soft_white", patternLabel: "Soft White", patternUrl: "#eee" },
      { code: "oak_wood", patternLabel: "Oak Wood", patternUrl: "wood.png" },
      { code: "red", patternLabel: "Red", patternUrl: "red.png" },
      { code: "brown", patternLabel: "Brown", patternUrl: "brown.png" },
      { code: "dark", patternLabel: "Dark", patternUrl: "dark.png" }
    ],
    tabSelected: "features",
    subCategorySelected: ["wall", "base", "tall", "pantry"]
  };

  componentDidMount() {
    const { product } = this.props;

    // Select first variant by default
    this.selectVariant(product.variants[0]);
  }

  selectVariant(variant, optionId) {
    const { product, uiStore } = this.props;

    // Select the variant, and if it has options, the first option
    const variantId = variant._id;
    let selectOptionId = optionId;
    if (!selectOptionId && variant.options && variant.options.length) {
      selectOptionId = variant.options[0]._id;
    }

    // this.trackAction({ variant, optionId, action: PRODUCT_VIEWED });

    uiStore.setPDPSelectedVariantId(variantId, selectOptionId);

    Router.pushRoute(
      "product",
      {
        slugOrId: product.slug,
        variantId: selectOptionId || variantId
      },
      { replace: true }
    );
  }

  // @trackProduct()
  // trackAction() {}

  // @trackCartItems()
  // trackCartItems() {}

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
    const {
      addItemsToCart,
      currencyCode,
      product,
      uiStore: { openCartWithTimeout, pdpSelectedOptionId, pdpSelectedVariantId },
      width
    } = this.props;

    // Get selected variant or variant option
    const selectedVariant = variantById(product.variants, pdpSelectedVariantId);
    const selectedOption = variantById(selectedVariant.options, pdpSelectedOptionId);
    const selectedVariantOrOption = selectedOption || selectedVariant;

    if (selectedVariantOrOption) {
      // Get the price for the currently selected variant or variant option
      const price = priceByCurrencyCode(currencyCode, selectedVariantOrOption.pricing);

      // Call addItemsToCart with an object matching the GraphQL `CartItemInput` schema
      const { data } = await addItemsToCart([
        {
          price: {
            amount: price.price,
            currencyCode
          },
          productConfiguration: {
            productId: product.productId, // Pass the productId, not to be confused with _id
            productVariantId: selectedVariantOrOption.variantId // Pass the variantId, not to be confused with _id
          },
          quantity
        }
      ]);

      // If no errors occurred, track action
      if (data) {
        // The response data will be in either `createCart` or `addCartItems` prop
        // depending on the type of user, either authenticated or anonymous.
        const { cart } = data.createCart || data.addCartItems;
        const { edges: items } = cart.items;

        // this.trackAction({
        //   variant: {
        //     ...selectedVariant,
        //     cart_id: cart._id, // eslint-disable-line camelcase
        //     quantity
        //   },
        //   optionId: selectedOption ? selectedOption._id : null,
        //   action: PRODUCT_ADDED
        // });

        // The mini cart popper will open automatically after adding an item to the cart,
        // therefore, a CART_VIEWED event is published.
        // debugger // eslint-disable-line
        // this.trackCartItems({ cartItems: items, cartId: cart._id, action: CART_VIEWED }); // eslint-disable-line camelcase
      }
    }
    if (isWidthUp("md", width)) {
      // Open the cart, and close after a 3 second delay
      openCartWithTimeout(3000);
    }
  };

  /**
   * @name handleSelectOption
   * @summary Called when an option is selected in the option list
   * @private
   * @ignore
   * @param {Object} option The option object that was selected
   * @returns {undefined} No return
   */
  handleSelectOption = option => {
    const { product, uiStore } = this.props;

    // If we are clicking an option, it must be for the current selected variant
    const variant = product.variants.find(vnt => vnt._id === uiStore.pdpSelectedVariantId);

    this.selectVariant(variant, option._id);
  };

  /**
   * @name determineProductPrice
   * @description Determines a product's price given the shop's currency code. It will
   * use the selected option if available, otherwise it will use the selected variant.
   * @returns {Object} An pricing object
   */
  determineProductPrice() {
    const { currencyCode, product } = this.props;
    const { pdpSelectedVariantId, pdpSelectedOptionId } = this.props.uiStore;
    const selectedVariant = variantById(product.variants, pdpSelectedVariantId);
    let productPrice = {};

    if (pdpSelectedOptionId && selectedVariant) {
      const selectedOption = variantById(selectedVariant.options, pdpSelectedOptionId);
      productPrice = priceByCurrencyCode(currencyCode, selectedOption.pricing);
    } else if (!pdpSelectedOptionId && selectedVariant) {
      productPrice = priceByCurrencyCode(currencyCode, selectedVariant.pricing);
    }

    return productPrice;
  }

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
    const { classes } = this.props;
    const { colorFilters, colorFilterSelected } = this.state;
    return (
      <section>
        <ul
          style={{
            listStyle: "none",
            display: "inline-flex",
            flexFlow: "row nowrap",
            width: "100%",
            justifyContent: "flex-end"
          }}
        >
          {colorFilters.map(pattern => {
            return (
              <li className={classes.colorPatternListItem}>
                <button
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    marginRight: "2rem",
                    backgroundImage: `url('/static/images/patterns/${pattern.patternUrl}')`,
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    border: colorFilterSelected
                      ? colorFilterSelected.code === pattern.code
                        ? "2px solid #555"
                        : "none"
                      : "none"
                  }}
                  className={classes.colorPatternItem}
                  onClick={() => this.selectDesignColor(pattern)}
                >
                  <span
                    style={{
                      display: "none"
                    }}
                  >
                    {pattern.patternLabel}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  handleGetSampleClick() {
    console.log("GET SAMPLE");
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem"
          }}
        >
          <img src="https://via.placeholder.com/80x100" alt="product photo" />
          <div
            style={{
              textAlign: "left",
              paddingLeft: "1rem"
            }}
          >
            <h3
              style={{
                color: "#4E4E4E",
                fontFamily: "Lato, sans-serif",
                fontSize: "1rem",
                marginTop: 0,
                fontWeight: "normal"
              }}
            >
              Soft White
            </h3>
            <span
              style={{
                color: "#B09A51",
                fontFamily: "Lato, sans-serif",
                fontSize: ".9rem",
                fontWeight: 600
              }}
            >
              ${"1,199"}
            </span>
          </div>
        </div>
        <button
          onClick={this.handleGetSampleClick}
          style={{
            border: "2px solid #B09A51",
            color: "#B09A51",
            borderRadius: "1rem",
            padding: "6px 14px",
            background: "#fff",
            backgroundColor: "#fff"
          }}
        >
          Get a Sample
        </button>
      </section>
    );
  }

  selectTab = tab => {
    this.setState({
      tabSelected: tab
    });
  };

  renderTabDetails() {
    const { classes, product } = this.props;
    return (
      <section className={classes.renderTabsSection}>
        <div className={classes.buttons}>
          <button
            style={{
              borderBottom: this.state.tabSelected === "features" ? "4px solid #B09A51" : "none",
              color: this.state.tabSelected === "features" ? "#B09A51" : "#222"
            }}
            className={classes.buttonTabs}
            onClick={() => this.selectTab("features")}
          >
            Features
          </button>
          <button
            style={{
              borderBottom: this.state.tabSelected === "details" ? "4px solid #B09A51" : "none",
              color: this.state.tabSelected === "details" ? "#B09A51" : "#222"
            }}
            className={classes.buttonTabs}
            onClick={() => this.selectTab("details")}
          >
            Description
          </button>
        </div>
        <section className={classes.contentContainer}>
          {this.state.tabSelected === "details" ? <div className={classes.content}>{product.description}</div> : null}
          {this.state.tabSelected === "features" ? (
            <div className={[classes.content, classes.features]}>Features content</div>
          ) : null}
        </section>
      </section>
    );
  }

  handleSubCategorySelect = (value) => {
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
  }

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
            fontSize: "1rem"
          }}
          defaultValue=""
          className={classes.filterSelect}
        >
          <option value="" disabled selected>
            {categoryObj.category.toUpperCase()}
          </option>
          {categoryObj.options.map((elem, key) => {
            return this.renderOption(elem, key);
          })}
        </select>
      </div>
    );
  }

  renderOption(option, key) {
    const { classes } = this.props;
    return <option value={option.value}>{option.label}</option>;
  }

  renderAttributeChoices() {
    try {
      const { classes } = this.props;
      return (
        <section className={classes.section}>
          <div className={classes.selectContainer}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <SubcategoriesLabel />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <FormControl component="fieldset" className={classes.formControl}>
                  {["wall", "base", "tall", "pantry"].map((elem, key) => this.renderCheckboxControl(elem, key))}
                </FormControl>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
          <div className={classes.categoryFilters}>
            {this.renderCategorySelect({
              category: "width",
              options: [{ value: 20, label: "20" }, { value: 21, label: "21" }]
            })}
            {this.renderCategorySelect({
              category: "height",
              options: [{ value: 20, label: "20" }, { value: 21, label: "21" }]
            })}
            {this.renderCategorySelect({
              category: "depth",
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
      currencyCode,
      product,
      routingStore,
      theme,
      uiStore: { pdpSelectedOptionId, pdpSelectedVariantId },
      width
    } = this.props;

    console.log("color selected: ", this.state);

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

    const productPrice = this.determineProductPrice();
    const compareAtDisplayPrice = (productPrice.compareAtPrice && productPrice.compareAtPrice.displayAmount) || null;

    // Phone size
    if (isWidthDown("sm", width)) {
      return (
        <Fragment>
          <div className={classes.section}>
            <MediaGallery mediaItems={pdpMediaItems} />
          </div>

          <div className={classes.section}>
            {this.renderColorSelect()}
            {this.renderSampleBox()}
            {/* <ProductDetailAddToCart
              onClick={this.handleAddToCartClick}
              selectedOptionId={pdpSelectedOptionId}
              selectedVariantId={pdpSelectedVariantId}
              variants={product.variants}
            /> */}
          </div>

          <div className={classes.section}>{this.renderTabDetails()}</div>

          {this.renderAttributeChoices()}

          <div className={classes.variantOptionList}>
            {this.renderVariantBox(product)}
            {/* <VariantList
              onSelectOption={this.handleSelectOption}
              onSelectVariant={this.handleSelectVariant}
              product={product}
              selectedOptionId={pdpSelectedOptionId}
              selectedVariantId={pdpSelectedVariantId}
              currencyCode={currencyCode}
              variants={product.variants}
            /> */}
          </div>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Grid container spacing={theme.spacing.unit * 5}>
          <Grid item xs={12} sm={6}>
            <div className={classes.section}>
              <MediaGallery mediaItems={pdpMediaItems} />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <ProductDetailTitle pageTitle={product.pageTitle} title={product.title} />
            <div className={classes.info}>
              <ProductDetailVendor>{product.vendor}</ProductDetailVendor>
            </div>
            <div className={classes.info}>
              <ProductDetailPrice
                className={classes.bottomMargin}
                compareAtPrice={compareAtDisplayPrice}
                price={productPrice.displayPrice}
              />
            </div>
            <div className={classes.info}>
              <ProductDetailDescription>{product.description}</ProductDetailDescription>
            </div>
            <VariantList
              onSelectOption={this.handleSelectOption}
              onSelectVariant={this.handleSelectVariant}
              product={product}
              selectedOptionId={pdpSelectedOptionId}
              selectedVariantId={pdpSelectedVariantId}
              currencyCode={currencyCode}
              variants={product.variants}
            />
            {/* <ProductDetailAddToCart
              onClick={this.handleAddToCartClick}
              selectedOptionId={pdpSelectedOptionId}
              selectedVariantId={pdpSelectedVariantId}
              variants={product.variants}
            /> */}
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default ProductDetail;

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Card, Paper } from "@material-ui/core";
import ProductDetailTitle from "../ProductDetailTitle";

const styles = theme => ({
  loadMore: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  content: {
    paddingLeft: "1rem",
    width: "100%",
  },
  cfXPgA: {
    paddingLeft: 0,
    paddingRight: 0
  },
  cardContainer: {
    padding: "1rem",
    display: "flex",
    flexFlow: "row nowrap",
    background: "#FFFEF9",
  },
  lastLine: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between"
  },
  featuresList: {
    listStyleType: "none",
    padding: 0,
    fontFamily: "Lato, sans-serif",
    fontSize: "11px",
    color: "#4E4E4E"
  },
  features: {
    marginBottom: ".5rem"
  },
  titleH3: {
    fontFamily: "Lato, sans-serif",
    fontSize: "15px",
    color: "#8E7A3F",
    marginTop: "0rem"
  },
  incrementDecrementButtons: {
    borderRadius: "50%",
    color: "#fff",
    padding: "4px",
    width: "30px",
    height: "30px",
    fontWeight: 600,
    background: "#B09A51",
    fontWeight: 600,
    fontSize: "18px",
    textAlign: "center",
    outline: "none"
  },
  quantityNumber: {
    margin: ".5rem",
    color: "#4E4E4E",
    fontFamily: "Lato, sans-serif",
    fontSize: "12px"
  },
  originalPrice: {
    color: "#C6C6C6",
    fontFamily: "Lato, sans-serif",
    fontSize: "12px",
    textDecoration: "line-through",
    marginRight: ".5rem",
  },
  price: {
    color: "#B09A51",
    fontFamily: "Lato, sans-serif",
    fontSize: "13px",
    fontWeight: 600,
  }
});

@withStyles(styles, { name: "SkCartItems" })
class CartItems extends Component {
  static propTypes = {
    classes: PropTypes.object,
    hasMoreCartItems: PropTypes.bool,
    isMiniCart: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        attributes: PropTypes.arrayOf(PropTypes.object),
        currencyQuantity: PropTypes.number,
        imageUrl: PropTypes.string,
        isLowInventoryQuantity: PropTypes.bool,
        price: PropTypes.shape({
          displayPrice: PropTypes.string,
          compareAtPrice: PropTypes.string
        }),
        productSlug: PropTypes.string,
        title: PropTypes.string,
        quantity: PropTypes.number
      })
    ).isRequired,
    onChangeCartItemQuantity: PropTypes.func.isRequired,
    onLoadMoreCartItems: PropTypes.func,
    onRemoveItemFromCart: PropTypes.func.isRequired,
    productURLPath: PropTypes.string
  };

  handleItemQuantityChange = (quantity, _id) => {
    const { onChangeCartItemQuantity } = this.props;

    onChangeCartItemQuantity(quantity, _id);
  };

  handleRemoveItem = _id => {
    const { onRemoveItemFromCart } = this.props;

    onRemoveItemFromCart(_id);
  };

  renderQuantityControl(quantity) {
    const { classes } = this.props;
    return (
      <div>
        <button className={classes.incrementDecrementButtons}>&#8722;</button>
        <span className={classes.quantityNumber}>{quantity}</span>
        <button className={classes.incrementDecrementButtons}>&#43;</button>
      </div>
    );
  }

  renderPrice(price) {
    const { classes } = this.props;
    return (
      <div>
        <span className={classes.originalPrice}>{price.displayAmount}</span>
        <span className={classes.price}>{price.displayAmount}</span>
      </div>
    );
  }

  renderProductCartItem(item) {
    const { classes } = this.props;

    console.log("item: ", item);
    return (
      <Card style={{
        boxShadow: "none",
        border: "none",
        borderRight: "5px solid #F2EFE3",
      }}>
        <section className={classes.cardContainer}>
          <div>
            <img src="https://via.placeholder.com/100x120" alt="product photo" />
          </div>
          <div className={classes.content}>
            <h3 className={classes.titleH3}>{item.title}</h3>
            <ul className={classes.featuresList}>
              <li className={classes.features}>
                Dimension: <span>10"w x 8"h x 9"d</span>
              </li>
              <li className={classes.features}>
                Paint Finish: <span>High Gloss</span>
              </li>
            </ul>
            <div className={classes.lastLine}>
              {this.renderQuantityControl(item.quantity)}
              {this.renderPrice(item.price)}
            </div>
          </div>
        </section>
      </Card>
    )
  }

  render() {
    const { items } = this.props;

    return (
      <Fragment>
        {/* <CartItemsList
          isMiniCart={isMiniCart}
          isReadOnly={isReadOnly}
          items={items}
          onChangeCartItemQuantity={this.handleItemQuantityChange}
          onRemoveItemFromCart={this.handleRemoveItem}
          productURLPath="/product/"
        /> */}
        {items.map((item, key) => {
          return this.renderProductCartItem(item, key);
        })}
      </Fragment>
    );
  }
}

export default CartItems;

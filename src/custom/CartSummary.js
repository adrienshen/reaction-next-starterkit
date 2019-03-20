import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";

const styles = theme => ({
  container: {},
  list: {
    listStyle: "none",
    padding: 0
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
    fontFamily: "Lato, sans-serif",
    fontSize: "16px"
  },
  fadedOut: {
    color: "#AAA"
  },
  labelBlack: {
    color: "#4E4E4E"
  },
  totalPrice: {
    color: "#B09A51"
  },
  applyButton: {
    background: "transparent",
    borderRadius: "1.5rem",
    border: "2px solid #B09A51",
    color: "#B09A51",
    fontWeight: 500,
    padding: ".5rem 1rem",
    fontSize: "1rem"
  },
  discountInput: {
    borderRadius: "1.5rem",
    border: "2px solid #eee",
    padding: ".65rem",
    fontSize: "1rem",
    color: "#aaa",
    outline: "none",
    width: "12rem"
  },
});

@withStyles(styles, { name: "SkCartSummary" })
class CartItems extends Component {
  static propTypes = {
    classes: PropTypes.object
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Card
          style={{
            boxShadow: "none",
            border: "none",
            background: "#FFFEF9",
            padding: "1rem"
          }}
        >
          <ul className={classes.list}>
            <li className={classes.listItem}>
              <span className={classes.fadedOut}>Subtotal</span>
              <span className={classes.fadedOut}>${`7,899`}</span>
            </li>
            <li className={classes.listItem}>
              <span className={classes.fadedOut}>Discount</span>
              <span className={classes.fadedOut}>- ${`1,600`}</span>
            </li>
            <li className={classes.listItem}>
              <span className={classes.labelBlack}>Total</span>
              <span className={classes.totalPrice}>${`6,298`}</span>
            </li>
            <li className={classes.listItem}>
              <input className={classes.discountInput} type="text" placeholder="Discount Code" />
              <button className={classes.applyButton} onClick={() => alert("APPLY DISCOUNT")}>
                Apply
              </button>
            </li>
          </ul>
        </Card>
      </Fragment>
    );
  }
}

export default CartItems;

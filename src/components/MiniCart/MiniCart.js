import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CartIcon from "mdi-material-ui/Cart";
import { Router } from "routes";
import Badge from "@material-ui/core/Badge";
import withCart from "containers/cart/withCart";
import withShop from "containers/shop/withShop";
import track from "lib/tracking/track";

const styles = ({ palette }) => ({
  cart: {
    backgroundColor: palette.common.white
  },
  badge: {
    width: 20,
    height: 20,
    top: 10,
    left: 20
  }
});

@withStyles(styles, { name: "SkMiniCart" })
@withShop
@withCart
@inject("uiStore")
@track()
@observer
export default class MiniCart extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
      checkout: PropTypes.shape({
        itemTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        }),
        taxTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        })
      })
    }),
    classes: PropTypes.object.isRequired,
    hasMoreCartItems: PropTypes.bool,
    loadMoreCartItems: PropTypes.func,
    onChangeCartItemsQuantity: PropTypes.func,
    onRemoveCartItems: PropTypes.func,
    uiStore: PropTypes.shape({
      isCartOpen: PropTypes.bool.isRequired,
      openCart: PropTypes.func.isRequired,
      closeCart: PropTypes.func.isRequired
    })
  };

  constructor(props) {
    super(props);

    this.setPopoverAnchorEl = element => {
      this.anchorElement = element;
    };
  }

  state = {
    anchorElement: null
  };

  anchorElement = null;

  handleOnClick = () => {
    const { closeCart } = this.props.uiStore;
    closeCart();
    Router.pushRoute("cart");
  };

  render() {
    const { cart, classes } = this.props;

    return (
      <Fragment>
        <div ref={this.setPopoverAnchorEl}>
          <IconButton color="inherit" onClick={this.handleOnClick}>
            {cart && cart.totalItemQuantity > 0 ? (
              <Badge badgeContent={cart.totalItemQuantity} color="primary" classes={{ badge: classes.badge }}>
                <CartIcon />
              </Badge>
            ) : (
              <CartIcon />
            )}
          </IconButton>
        </div>
      </Fragment>
    );
  }
}

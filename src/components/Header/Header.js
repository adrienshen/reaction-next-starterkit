import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { Router } from "routes";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import MiniCart from "components/MiniCart";
import BackArrow from "components/BackArrow";
import SearchIcon from "../SearchIcon";

const styles = theme => ({
  appBar: {
    borderBottom: `solid 1px ${theme.palette.reaction.black05}`,
    color: theme.palette.reaction.coolGrey500,
    background: "transparent"
  },
  controls: {
    alignItems: "inherit",
    display: "flex",
    flex: 1,
    justifyContent: "center",
    paddingLeft: "2rem",
  },
  title: {
    // color: theme.palette.reaction.reactionBlue,
    color: "#4E4E4E",
    marginRight: theme.spacing.unit,
    fontFamily: "Lato, sans-serif",
    fontSize: "19px"
  },
  toolbar: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    background: "transparent"
  }
});

const BarOptions = {
  "/search": { display: false },
  "/productGrid": { display: false },
  "/cart": { display: false },
  "/product-samples": { display: true, title: "Sample Details", cart: true, search: true, leftIcon: "back" },
  "/wishlist": { display: true, title: "Wishlist", cart: true, search: true, leftIcon: "back" },
  "/orders": { display: true, title: "My Orders", cart: false, search: true, leftIcon: "back" },
  "/about": { display: true, title: "About", cart: false, search: false, leftIcon: null },
  "/contactUs": { display: true, title: "About Us", cart: false, search: false, leftIcon: null },
  "/faq": { display: true, title: "FAQ", cart: false, search: false, leftIcon: null },
  "/measure": { display: true, title: "Measurement Info", cart: false, search: false, leftIcon: null },
  "/category.kitchen": { display: true, title: "Kitchen", cart: true, search: true, leftIcon: "back" },
  "/bedroom": { display: true, title: "Bedroom", cart: true, search: true, leftIcon: "back" },
  "/styles": { display: true, title: "Styles", cart: true, search: true, leftIcon: "back" },
  "/personalInformation": { display: true, title: "Personal Information", cart: false, search: false, leftIcon: false },
  "/contactDesigners": { display: true, title: "Contact Designers", cart: false, search: false, leftIcon: false }
};

@withStyles(styles, { name: "SkHeader" })
@inject("uiStore")
class Header extends Component {
  static propTypes = {
    classes: PropTypes.object,
    shop: PropTypes.shape({
      name: PropTypes.string
    }).isRequired,
    uiStore: PropTypes.shape({
      toggleMenuDrawerOpen: PropTypes.func.isRequired
    }).isRequired,
    viewer: PropTypes.object
  };

  static defaultProps = {
    classes: {}
  };

  handleNavigationToggleClick = () => {
    this.props.uiStore.toggleMenuDrawerOpen();
  };

  render() {
    try {
      const {
        classes: { appBar, controls, toolbar, title },
      } = this.props;

      console.log("Router.router.route: ", Router.router.route);
      const screen = BarOptions[Router.router.route];
      if (!screen || screen.display === false) return <div style={{ width: "56px" }} />;

      return (
        <AppBar
          style={{
            border: "none",
            paddingTop: "1rem"
          }}
          position="static"
          elevation={0}
          className={appBar}
        >
          <Toolbar className={toolbar}>
            {screen.leftIcon === "back" ? <BackArrow /> : null}
            <div className={controls}>
              <span className={title}>{screen.title || ""}</span>
            </div>
            {screen.cart ? <MiniCart /> : null}
            {screen.search ? <SearchIcon /> : null}
          </Toolbar>
        </AppBar>
      );
    } catch (err) {
      console.error("There was an error! Header.js:111");
      return null;
    }
  }
}

export default Header;

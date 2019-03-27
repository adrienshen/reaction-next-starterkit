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
import RenderError from "../../custom/components/RenderError";

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
    fontSize: "17px"
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
  "/wishlist": { display: true, title: "Wishlist", cart: true, search: true, leftIcon: "back" }
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
        shop
      } = this.props;

      const screen = BarOptions[Router.router.route];
      if (screen.display === false) return <div style={{ width: "56px" }} />;

      return (
        <AppBar
          style={{
            border: "none"
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
      console.error("There was an error! ", err);
      return null;
    }
  }
}

export default Header;

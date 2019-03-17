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
    justifyContent: "center"
  },
  title: {
    // color: theme.palette.reaction.reactionBlue,
    color: "#444",
    marginRight: theme.spacing.unit,
    fontFamily: "arial, sans-serif"
  },
  toolbar: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    background: "transparent"
  }
});

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
    const {
      classes: { appBar, controls, toolbar, title },
      shop
    } = this.props;
    if (Router.router && Router.router.route === "/search") return null;
    if (Router.router && Router.router.route === "/productGrid") return null;

    return (
      <AppBar position="static" elevation={0} className={appBar}>
        <Toolbar className={toolbar}>
          <BackArrow />
          <div className={controls}>
            <span className={title}>Page Title</span>
          </div>
          <MiniCart />
          <SearchIcon />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;

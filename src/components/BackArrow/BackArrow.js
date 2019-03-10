import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import { Router } from "routes";

import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";

import withShop from "containers/shop/withShop";

const styles = () => ({
  badge: {
    width: 20,
    height: 20,
    top: 10,
    left: 20
  }
});

@inject("uiStore")
@observer
export default class BackArrow extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  state = {};

  handleClick() {
    console.log("something clicked!");
  }

  render() {
    return (
      <Fragment>
        <div>
          <IconButton color="inherit" onClick={this.handleClick}>
            <ArrowBack />
          </IconButton>
        </div>
      </Fragment>
    );
  }
}

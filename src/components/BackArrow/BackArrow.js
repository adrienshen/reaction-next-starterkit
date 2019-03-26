import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Router from "routes";

import IconButton from "@material-ui/core/IconButton";

@inject("uiStore")
@observer
export default class BackArrow extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  handleClick() {
    console.log("Router: ", Router);
    Router.Router.back();
  }

  renderIcon() {
    // Handle logic for displaying back arrow
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path fill="#555" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
      </svg>
    );
  }

  render() {
    return (
      <Fragment>
        <div>
          <IconButton color="inherit" onClick={this.handleClick}>
            {this.renderIcon()}
          </IconButton>
        </div>
      </Fragment>
    );
  }
}

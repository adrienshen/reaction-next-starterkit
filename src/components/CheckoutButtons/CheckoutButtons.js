import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router } from "routes";

export default class CheckoutButtons extends Component {
  static propTypes = {
    /**
     * Set to `true` to prevent the button from calling `onClick` when clicked
     */
    isDisabled: PropTypes.bool,
    /**
     * The NextJS route name for the primary checkout button.
     */
    primaryButtonRoute: PropTypes.string,
    /**
     * Text to display inside the button
     */
    primaryButtonText: PropTypes.string,
    /**
     * className for primary checkout button
     */
    primaryClassName: PropTypes.string
  };

  static defaultProps = {
    primaryButtonRoute: "/cart/checkout",
    primaryButtonText: "Checkout"
  };

  handleOnClick = () => {
    const { primaryButtonRoute } = this.props;
    Router.pushRoute(primaryButtonRoute);
  };

  render() {
    const { isDisabled, primaryClassName, primaryButtonText } = this.props;

    return (
      <div
        style={{
          width: "100%",
          display: "inline-block",
          textAlign: "right"
        }}
      >
        <button
          style={{
            background: "#B09A51",
            color: "#fff",
            border: "#B09A51",
            padding: ".75rem 2rem",
            borderRadius: "1.3rem",
            fontSize: "1.15rem",
            textTransform: "uppercase"
          }}
          isDisabled={isDisabled}
          onClick={this.handleOnClick}
        >
          {primaryButtonText}
        </button>
      </div>
    );
  }
}

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";
import { Dots } from "./onboardingTwo";
import { Button } from "../custom/components/Buttons";
import { Router } from "routes";
import { PatternLeft } from "../custom/components/BackgroundPattern";

const styles = {
  dotContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center"
  },
  dot: {
    display: "inline-block",
    width: "10px",
    height: "10px",
    backgroundColor: "#aaa",
    borderRadius: "50%",
    margin: ".5rem"
  },
  copy: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#4E4E4E",
    fontFamily: "Lato, Regular",
  }
};

@inject("uiStore")
@observer
class OnboardingTwo extends Component {
  static propTypes = {
    authStore: PropTypes.shape({
      account: PropTypes.object.isRequired
    }),
    classes: PropTypes.object,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  };

  goHome = () => {
    Router.push("/");
  }

  render() {
    const { shop } = this.props;
    return (
      <Fragment>
        <Helmet
          title={`Account Profile | ${shop && shop.name}`}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        <section
          className="onboarding"
          style={{
            padding: "10rem 1rem"
          }}
        >
          <PatternLeft />
          <div
            style={{
              textAlign: "center",
              marginBottom: "5rem"
            }}
          >
            <img src="https://placeholder.pics/svg/150x150" alt="" />
          </div>
          <div style={styles.copy}>
            <span>Get in touch with our professionals to bring your idea to life</span>
          </div>
          <Dots selected={3} />
          <Button
            type="hollow"
            htmlType="button"
            text="LET'S GO"
            size="l"
            onClick={this.goHome}
            isSubmitting={false}
          />
        </section>
      </Fragment>
    );
  }
}

export default OnboardingTwo;

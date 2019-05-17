import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";
import { PatternLeft } from "../custom/components/BackgroundPattern";
import { Router } from "routes";

const styles = {
  dotContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2rem"
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

  goNext = () => {
    Router.push("/onboarding-three");
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
            <img
              onClick={this.goNext}
              src="https://placeholder.pics/svg/150x150" alt="" />
          </div>
          <div style={styles.copy}>
            <span>Browse different designs and save them to your Wishlist for later</span>
          </div>
          <Dots selected={2} />
        </section>
      </Fragment>
    );
  }
}

export const Dots = ({ selected }) => {
  return (
    <div style={styles.dotContainer}>
      {[1, 2, 3].map((index, key) => {
        return <span
          key={key}
          style={{
            ...styles.dot,
            background: selected === index ? "#B09A51" : "#aaa",
            height: selected === index ? "15px" : "10px",
            width: selected === index ? "15px" : "10px"
          }} />
      })}
    </div>
  );
};

export default OnboardingTwo;

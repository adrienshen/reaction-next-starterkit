import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";
import { Button } from "../custom/components/Buttons";

const styles = {
  section: {
    padding: "1rem",
    textAlign: "center",
  },
  body: {
    color: "#4E4E4E",
    marginBottom: "10rem",
  }
}

/**
 * Building and styling UI for the the email sent page
 * 
 */

@inject("uiStore")
@observer
class OnboardingOne extends Component {
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

  render() {
    const { shop } = this.props;
    return (
      <Fragment>
        <Helmet
          title={`Account Profile | ${shop && shop.name}`}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        <section style={styles.section} className="onboarding">
          <h3>Email sent!</h3>
          <p style={styles.body}>Please check your inbox for further instructions.</p>
          <Button
            size="l"
            text="CONTINUE TO LOG IN"
            onClick={() => console.log("Go to login? >")}
          />
        </section>
      </Fragment>
    );
  }
}

export default OnboardingOne;

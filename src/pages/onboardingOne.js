import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";

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
        <section className="onboarding">
          <div>Logo</div>
          <h1>ONE CABINET</h1>
        </section>
      </Fragment>
    );
  }
}

export default OnboardingOne;

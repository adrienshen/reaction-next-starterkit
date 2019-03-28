import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";

const styles = {
  container: {
    marginBottom: "4rem"
  },
};

@inject("authStore")
@inject("uiStore")
@observer
class PaymentMethodsPage extends Component {
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
    const {
      authStore: { account },
      shop
    } = this.props;

    // If there is no logged in user, return Not Found page
    // if (account && !account._id) return <ErrorPage shop={shop} subtitle="Not Found" />;

    return (
      <Fragment>
        <Helmet
          title={`Account Profile | ${shop && shop.name}`}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        Orders...
      </Fragment>
    );
  }
}

export default PaymentMethodsPage;

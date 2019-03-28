import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";
import { Card } from "@material-ui/core";

const styles = {
  container: {
    marginBottom: "4rem"
  },
};

@inject("authStore")
@inject("uiStore")
@observer
class OrdersPage extends Component {
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

  state = {
    // RC 
    orders: [
      {
        _id: "12345678",
        sku: "12345678",
        category: "Base",
        paint: "High Gloss",
        dimensions: `10"W x 12"H x 9"D`,
        quantity: 1,
        items: []
      }
    ]
  }

  renderOrderItem(order) {
    return <Card>
      <OrderNumber id="123456789" />
    </Card>
  }

  renderOrders() {
    return this.state.orders.map(order => {
      return renderOrderItem(order)
    })
  }

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

export default OrdersPage;

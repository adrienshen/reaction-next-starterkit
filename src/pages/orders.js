import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";
import { Card } from "@material-ui/core";
import { OrderNumber, OrderItemRow, TotalAmount } from "../custom/components/Text";
import { PendingBadge } from "../custom/components/Badges";

const styles = {
  container: {
    marginBottom: "4rem"
  },
  card: {
    padding: "1rem",
    width: "90%",
    margin: "0 auto",
    marginBottom: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    background: "#FFFEF9",
    maxWidth: "450px",
  }
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
    orders: [1, 2]
  }

  renderOrderItem(order) {
    return <Card elevation={0} style={styles.card}>
      <div style={{
        display: "flex",
        flexDirection: "row no-wrap",
        justifyContent: "space-between",
        marginBottom: "2rem",
      }}>
        <OrderNumber id="123456789" />
        <PendingBadge />
      </div>
      <OrderItemRow label="Order Date" value={`03/05/2019`} />
      <OrderItemRow label="SKU" value={`1234567`} />
      <OrderItemRow label="Category" value={`Base`} />
      <OrderItemRow label="Paint Finish" value={`Paint Gloss`} />
      <OrderItemRow label="Dimensions" value={`10"W x 12"H x 9"D`} />
      <OrderItemRow label="Quantity" value={1} />
      <TotalAmount amount="$1,499" />
    </Card>
  }

  renderCustomerOrders() {
    return this.state.orders.map(order => {
      return this.renderOrderItem(order)
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
        <section style={{ margin: "2rem 0rem" }}>
          {this.renderCustomerOrders()}
        </section>
      </Fragment>
    );
  }
}

export default OrdersPage;

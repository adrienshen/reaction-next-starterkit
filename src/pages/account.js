import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";
import AccountProfileInfo from "@reactioncommerce/components/AccountProfileInfo/v1";
import InPageMenu from "@reactioncommerce/components/InPageMenu/v1";
import withAddressBook from "containers/address/withAddressBook";
import ErrorPage from "./_error";
import { H2, UserName } from "../custom/components/Text";

import Avatar from "@material-ui/core/Avatar";
import { Link } from "@material-ui/core";
import { FavoriteIcon, OrdersIcon, ProfileIcon, CardIcon } from "../custom/components/SvgIcons";

const styles = {
  accountProfileInfoContainer: {
    marginBottom: "4rem"
  },
  avatarName: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
  },
  line: {
    margin: "2rem 0rem 2rem 1rem",
    display: "flex",
  },
  link: {
    color: "#404040",
    fontSize: "1.4rem",
    marginLeft: "1rem",
    fontFamily: "Lato, sans-serif",
  }
};

@withAddressBook
@inject("authStore")
@inject("uiStore")
@observer
class AccountHomeScreen extends Component {
  static propTypes = {
    authStore: PropTypes.shape({
      account: PropTypes.object.isRequired
    }),
    classes: PropTypes.object,
    onAddressAdded: PropTypes.func.isRequired,
    onAddressDeleted: PropTypes.func.isRequired,
    onAddressEdited: PropTypes.func.isRequired,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  };

  renderAccountProfileInfo() {
    const {
      authStore: { account },
      classes
    } = this.props;

    return (
      <div style={styles.accountProfileInfoContainer}>
        <AccountProfileInfo viewer={account} />
      </div>
    );
  }

  renderNavigation() {
    const {
      classes,
      router: { asPath }
    } = this.props;

    const menuItems = [
      {
        href: "/profile/address",
        route: "/profile/address",
        label: "Address Book",
        isSelected: asPath === "/profile/address"
      },
      {
        href: "/profile/orders",
        route: "/profile/orders",
        label: "Orders",
        isSelected: asPath === "/profile/orders"
      },
      {
        href: "/profile/payments",
        route: "/profile/payments",
        label: "Payment Methods",
        isSelected: asPath === "/profile/payments"
      }
    ];

    return (
      <div className={classes.inPageMenuItemLink}>
        <InPageMenu menuItems={menuItems} />
      </div>
    );
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
        <section>
          <H2 title="My Account" />
          <div style={styles.avatarName}>
            <Avatar style={{ marginBottom: "1rem", width: 80, height: 80 }}>DEV</Avatar>
            <UserName name="John Doe" />
          </div>
          <section className="navigation-items">
            <div style={styles.line}>
              <i>
                <FavoriteIcon />
              </i>
              <Link href="">
                <span style={styles.link}>Wishlist</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <OrdersIcon />
              </i>
              <Link href="">
                <span style={styles.link}>My Orders</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <ProfileIcon />
              </i>
              <Link href="/">
                <span style={styles.link}>Personal Information</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <CardIcon />
              </i>
              <Link href="">
                <span style={styles.link}>Payment Information</span>
              </Link>
            </div>
          </section>
        </section>
      </Fragment>
    );
  }
}

export default AccountHomeScreen;

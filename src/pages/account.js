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
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path fill="#B09A51" d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
                </svg>
              </i>
              <Link href="">
                <span style={styles.link}>Wishlist</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path fill="#B09A51" d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z" />
                </svg>
              </i>
              <Link href="">
                <span style={styles.link}>My Orders</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path fill="#B09A51" d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 9c2.7 0 5.8 1.29 6 2v1H6v-.99c.2-.72 3.3-2.01 6-2.01m0-11C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
                </svg>
              </i>
              <Link href="/">
                <span style={styles.link}>Personal Information</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path fill="#B09A51" d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                </svg>
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

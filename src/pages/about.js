import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";
import AccountProfileInfo from "@reactioncommerce/components/AccountProfileInfo/v1";
import InPageMenu from "@reactioncommerce/components/InPageMenu/v1";
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
    alignItems: "center"
  },
  line: {
    margin: "2rem 0rem 2rem 1rem",
    display: "flex"
  },
  link: {
    color: "#404040",
    fontSize: "1.3rem",
    marginLeft: "1rem",
    fontFamily: "Lato, sans-serif",
    textDecoration: "none"
  }
};

@inject("authStore")
@inject("uiStore")
@observer
class AboutIndex extends Component {
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

  render() {
    const {
      shop
    } = this.props;

    return (
      <Fragment>
        <Helmet
          title={`Account Profile | ${shop && shop.name}`}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        <section>
          <section className="navigation-items">
            <div style={styles.line}>
              <i>
                <FavoriteIcon />
              </i>
              <Link href="/about/dark">
                <span style={styles.link}>Dark Mode</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <OrdersIcon />
              </i>
              <Link href="/about/measure">
                <span style={styles.link}>How to Measure</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <ProfileIcon />
              </i>
              <Link href="/about/10x10">
                <span style={styles.link}>10x10 Kitchen</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <CardIcon />
              </i>
              <Link href="/about/tnc">
                <span style={styles.link}>Terms and Conditions</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <CardIcon />
              </i>
              <Link href="/about/faq">
                <span style={styles.link}>Frequently Asked Questions</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <CardIcon />
              </i>
              <Link href="/about/us">
                <span style={styles.link}>About Us</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <CardIcon />
              </i>
              <Link href="/about/contact">
                <span style={styles.link}>Contact Us</span>
              </Link>
            </div>
          </section>
        </section>
      </Fragment>
    );
  }
}

export default AboutIndex;

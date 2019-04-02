import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";
import AccountProfileInfo from "@reactioncommerce/components/AccountProfileInfo/v1";
import { Link } from "@material-ui/core";
import { PlaceholderIcon } from "../custom/components/SvgIcons";

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
    margin: "2rem 0rem 3rem 1rem",
    display: "flex"
  },
  link: {
    color: "#404040",
    fontSize: "17px",
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
    const { shop } = this.props;

    return (
      <Fragment>
        <Helmet
          title={`Account Profile | ${shop && shop.name}`}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        <section>
          <section className="navigation-items">
            <div style={styles.line}>
              <i style={{
                opacity: 0.5
              }}>
                <PlaceholderIcon />
              </i>
              <Link href="/about/dark">
                <span style={{
                  ...styles.link,
                  opacity: 0.5,
                }}>Dark Mode</span>
                <span style={{
                  color: "#fff",
                  background: "#B09A51",
                  padding: ".25rem .75rem",
                  borderRadius: "6px",
                  marginLeft: "5rem",
                  fontFamily: "Lato, sans-serif",
                  fontSize: "15px",
                  color: "#fff",
                  fontWeight: 500
                }}>Coming Soon!</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <PlaceholderIcon />
              </i>
              <Link href="/about/measure">
                <span style={styles.link}>How to Measure</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <PlaceholderIcon />
              </i>
              <Link href="/about/10x10">
                <span style={styles.link}>10x10 Kitchen</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <PlaceholderIcon />
              </i>
              <Link href="/about/tnc">
                <span style={styles.link}>Terms and Conditions</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <PlaceholderIcon />
              </i>
              <Link href="/about/faq">
                <span style={styles.link}>Frequently Asked Questions</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <PlaceholderIcon />
              </i>
              <Link href="/about/us">
                <span style={styles.link}>About Us</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <PlaceholderIcon />
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

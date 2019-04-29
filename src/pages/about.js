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
              <Link style={styles.link} href="/about/dark">
                <span style={{
                  opacity: 0.5,
                }}>Dark Mode</span>
                <span style={{
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
              <Link style={styles.link} href="/about/measure">
                <span>How to Measure</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <PlaceholderIcon />
              </i>
              <Link style={styles.link} href="/about/10x10">
                <span>10x10 Kitchen</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <PlaceholderIcon />
              </i>
              <Link style={styles.link} href="/about/tnc">
                <span>Terms and Conditions</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <PlaceholderIcon />
              </i>
              <Link style={styles.link} href="/about/faq">
                <span>Frequently Asked Questions</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <PlaceholderIcon />
              </i>
              <Link style={styles.link} href="/about/us">
                <span>About Us</span>
              </Link>
            </div>
            <div style={styles.line}>
              <i>
                <PlaceholderIcon />
              </i>
              <Link style={styles.link} href="/about/contact">
                <span>Contact Us</span>
              </Link>
            </div>
          </section>
        </section>
      </Fragment>
    );
  }
}

export default AboutIndex;

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import track from "lib/tracking/track";
import trackProductClicked from "lib/tracking/trackProductClicked";
import Slider from "react-slick";
import { Router } from "routes";
import SearchIcon from "../components/SearchIcon";
import Link from "../components/Link";

const styles = {
  sectionContainer: {
    padding: "1.5rem",
    position: "relative"
  },
  imagesList: {
    position: "relative",
    background: "#eee",
    height: "42vh"
  },
  navigationList: {
    listStyle: "none",
    width: "100%",
    padding: 0
  },
  navigationListItems: {
    display: "inline-block",
    width: "33%",
    textAlign: "center",
    fontFamily: "arial, sans-serif",
    fontSize: "1rem"
  },
  galleryOptions: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
    textAlign: "right",
    padding: ".25rem",
    background: "#D8B08C",
    opacity: ".5"
  },
  galleryOptionItem: {
    width: "10%",
    display: "inline-block",
    marginRight: "1rem",
    color: "#fff",
    fontWeight: 600
  },
  searchIcon: {
    width: "80px",
    position: "absolute",
    top: 30,
    right: -30,
    background: "#555",
    borderRadius: "1rem"
  },
  optionContainer: {
    marginBottom: "4rem"
  },
  subtitleH3: {
    color: "#b09a51",
    fontSize: "1.2rem",
    fontFamily: "arial, sans-serif",
    fontWeight: "400"
  },
  bodyText: {
    fontSize: "1rem",
    fontFamily: "arial, sans-serif",
    width: "80%",
    display: "inline-block",
    color: "#555"
  },
  optionButton: {
    borderRadius: "1rem",
    background: "#b09a51",
    color: "#fff",
    padding: ".25rem 1.25rem",
    fontSize: "1rem",
    border: "none",
    outline: "none"
  },
  rightAlign: {
    textAlign: "right"
  },
  contactContainer: {
    background: "#b09a51",
    padding: "1rem 2rem",
    textAlign: "center"
  },
  contactH3: {
    color: "#fff",
    fontFamily: "arial, sans-serif",
    fontWeight: 400,
    fontSize: "1.25rem"
  },
  contactBodyText: {
    color: "#fff",
    fontFamily: "arial, sans-serif"
  },
  contactButton: {
    background: "#fff",
    fontSize: "1.2rem",
    color: "#b09a51",
    borderRadius: "1rem",
    padding: ".4rem 1.2rem"
  },
  iconContainer: {
    marginBottom: ".5rem"
  },
  coverImage: {
    width: "100%",
    maxWidth: "450px",
    margin: "0 auto"
  },
  backgroundPatternLeft: {
    position: "fixed",
    width: "1000px",
    height: "1000px",
    left: -750,
    top: -700,
    background: "#B09A51",
    borderRadius: "50%",
    opacity: 0.2,
    zIndex: -10
  },
  backgroundPatternRight: {
    position: "fixed",
    width: "1200px",
    height: "1200px",
    right: -950,
    top: 150,
    background: "#B09A51",
    borderRadius: "50%",
    opacity: 0.2,
    zIndex: -10
  },
  findProfessionalSection: {
    background: "#4E4E4E",
    padding: "1rem",
    textAlign: "center",
    color: "#fff",
    fontFamily: "arial, sans-serif"
  },
  findProfessionalButton: {
    borderRadius: ".75rem",
    border: "2px solid #fff",
    color: "#fff",
    background: "#4E4E4E",
    padding: ".25rem .5rem"
  },
  areProfessionalSection: {
    background: "#8E7A3F",
    padding: "1rem",
    textAlign: "center",
    color: "#fff",
    fontFamily: "arial, sans-serif"
  },
  areProfessionalButton: {
    borderRadius: ".75rem",
    border: "2px solid #fff",
    color: "#8E7A3F",
    background: "#fff",
    padding: ".25rem .5rem"
  }
};

@withStyles(styles, { name: "SkHomeOptions" })
@track()
export default class ProductGrid extends Component {
  static propTypes = {
    catalogItems: PropTypes.arrayOf(PropTypes.object),
    classes: PropTypes.object,
    initialSize: PropTypes.object
  };

  @trackProductClicked()
  onItemClick = (event, product) => {}; // eslint-disable-line no-unused-vars

  goKitchenDesigns() {
    Router.pushRoute("kitchendesigns");
  }

  goWishList() {
    Router.pushRoute("wishlist");
  }

  renderSearchIcon() {
    return (
      <div styles={styles.searchIcon}>
        <SearchIcon light />
      </div>
    );
  }

  renderSubActions() {
    return (
      <div style={styles.galleryOptions}>
        <div style={styles.galleryOptionItem}>
          <div tabIndex={0} onClick={this.goKitchenDesigns} onKeyDown={this.goKitchenDesigns} role="link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#fff" d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </div>
        </div>
        <div style={styles.galleryOptionItem}>
          <div tabIndex={-1} onClick={this.goWishList} onKeyDown={this.goKitchenDesigns} role="link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                fill="#fff"
                d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  renderGalleryCover() {
    return (
      <section>
        <div style={styles.imagesList}>
          {this.renderGallerySlider()}
          {this.renderSearchIcon()}
          {this.renderSubActions()}
        </div>
      </section>
    );
  }

  renderGallerySlider() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    };

    return (
      <Slider {...settings}>
        <div>
          <img style={styles.coverImage} src="https://via.placeholder.com/350x230" alt="" />
        </div>
        <div>
          <img style={styles.coverImage} src="https://via.placeholder.com/350x230" alt="" />
        </div>
        <div>
          <img style={styles.coverImage} src="https://via.placeholder.com/350x230" alt="" />
        </div>
      </Slider>
    );
  }

  renderNavigationOptionsCopy() {
    return (
      <section style={styles.sectionContainer}>
        <div style={styles.backgroundPatternLeft} />
        <div style={{ ...styles.optionContainer, ...styles.rightAlign }}>
          <h3 style={styles.subtitleH3}>Not sure what you are looking for?</h3>
          <p style={styles.bodyText}>
            Browse our kitchen sets by categories or by style. Order a sample to make sure that's the right fit for your
            home.
          </p>
          <ul style={styles.navigationList}>
            <li style={styles.navigationListItems}>
              {this.renderIcon()}
              <span>Categories</span>
            </li>
            <li style={styles.navigationListItems}>
              {this.renderIcon()}
              <span>Styles</span>
            </li>
            <li style={styles.navigationListItems}>
              {this.renderIcon()}
              <img src="/placeholder" alt="" />
              <span>Samples</span>
            </li>
          </ul>
        </div>
      </section>
    );
  }

  renderIcon() {
    return (
      <Link href="/">
        <div style={styles.iconContainer}>
          <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24">
            <path d="M11 9.16V2c-5 .5-9 4.79-9 10s4 9.5 9 10v-7.16c-1-.41-2-1.52-2-2.84s1-2.43 2-2.84zM14.86 11H22c-.48-4.75-4-8.53-9-9v7.16c1 .3 1.52.98 1.86 1.84zM13 14.84V22c5-.47 8.52-4.25 9-9h-7.14c-.34.86-.86 1.54-1.86 1.84z" />
            <path fill="none" d="M0 0h24v24H0z" />
          </svg>
        </div>
      </Link>
    );
  }

  renderOtherOptionsCopy() {
    return (
      <section style={styles.sectionContainer}>
        <div style={styles.backgroundPatternRight} />
        <div style={styles.optionContainer}>
          <h3 style={styles.subtitleH3}>Looking for inspiration?</h3>
          <p style={styles.bodyText}>Browse our idea gallery and save designs you like for later.</p>
          <button style={styles.optionButton}>Browse</button>
        </div>
        <div style={{ ...styles.optionContainer, ...styles.rightAlign }}>
          <h3 style={styles.subtitleH3}>Let our professionals do the work</h3>
          <p style={styles.bodyText}>
            Have something on your mind? Contact our designers and get designs for your dream kitchen in a day.
          </p>
          <button style={styles.optionButton}>Contact</button>
        </div>
        <div style={styles.optionContainer}>
          <h3 style={styles.subtitleH3}>Measure your kitchen</h3>
          <p style={styles.bodyText}>
            Not sure how to measure your kitchen? Follow our measuring guideline or contact our designers to help you.
          </p>
          <button style={styles.optionButton}>Get Help</button>
        </div>
      </section>
    );
  }

  renderContactUsCopy() {
    return (
      <section style={styles.contactContainer}>
        <h3 style={styles.contactH3}>Grow your business</h3>
        <p style={styles.contactBodyText}>
          Are you a reseller and want to expand your business and become our partner?
        </p>
        <button style={styles.contactButton}>Contact Us</button>
      </section>
    );
  }

  renderFindProfessional() {
    return (
      <section style={styles.findProfessionalSection}>
        <h4 style={styles.professionalHeading}>Find a professional near you</h4>
        <p style={styles.professionalHeading}>Search our network by zip code or distance for a list of professionals</p>
        <button style={styles.findProfessionalButton}>Find a Professional</button>
      </section>
    );
  }

  renderAreProfessional() {
    return (
      <section style={styles.areProfessionalSection}>
        <h4 style={styles.professionalHeading}>Find a professional near you</h4>
        <p style={styles.professionalHeading}>Whether you are a cabinet or a countertop installer, carpenter, designer, reseller, or a general contractor, register with us and become our partner. One of the benefits you will receive is ordering cabinets directly from OneCabinet by discount prices.</p>
        <button style={styles.areProfessionalButton}>Register Here</button>
      </section>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderGalleryCover()}
        {this.renderNavigationOptionsCopy()}
        {this.renderOtherOptionsCopy()}
        {this.renderFindProfessional()}
        {this.renderAreProfessional()}
      </Fragment>
    );
  }
}

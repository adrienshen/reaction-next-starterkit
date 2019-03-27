import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import ErrorPage from "./_error";
import { WishListTitle } from "../custom/components/Text";
import { WishListImage } from "../custom/components/Images";

import IconButton from "@material-ui/core/IconButton";
import { TunesIcon, FavoriteFullIcon } from "../custom/components/SvgIcons";
import { Router } from "routes";

const WishListStaticMockLocal = [
  {
    name: "Potted Plant",
    productUrl: "potted-plant/cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OkdvRnlSak0zTUZyb2hTNkVn",
    primaryImage: "http://localhost:3000/assets/files/Media/MkTBScckCuQLoi6Lm/medium/green_plant_product_14301_1.jpg",
  },
  {
    name: "Doors",
    productUrl: "doors/cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OkRDZkhCSlNhTmtDOGVuR2VI",
    primaryImage: "http://localhost:3000/assets/files/Media/eMXwqTdeoAuZ73vZd/medium/Screenshot 2019-03-22 16.22.49.jpg",
  }
];

const styles = {
  imageContainer: {
    position: "relative",
    textAlign: "center",
    width: "90%",
    margin: "0 auto",
    marginBottom: "2rem"
  },
  toolbarCont: {
    display: "flex",
    width: "100%",
    background: "#D8B08C",
    opacity: 0.55,
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 0
  }
};

@withStyles(styles)
@inject("authStore")
@inject("uiStore")
@observer
class Profile extends Component {
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

  goProductDetailPage(url) {
    console.log("Navigate to details: ", url);
    Router.push("/product/" + url);
  }

  toggleFavorite() {
    console.log("Fave/Unfave");
  }

  renderWishItem(wish) {
    return (
      <div onClick={() => this.goProductDetailPage(wish.productUrl)}>
        <div style={styles.imageContainer}>
          <WishListTitle title={wish.name} />
          <WishListImage src={wish.primaryImage} />
          <ImageToolbar />
        </div>
      </div>
    );
  }

  render() {
    const {
      authStore: { account },
      shop
    } = this.props;

    // If there is no logged in user, return Not Found page
    // if (account && !account._id) return <div>Must log in to view this screen</div>;

    return (
      <Fragment>
        <Helmet
          title={`Wishlist | ${shop && shop.name}`}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        <section style={{ paddingTop: "2rem" }}>
          {WishListStaticMockLocal.map(wish => {
            return this.renderWishItem(wish);
          })}
        </section>
      </Fragment>
    );
  }
}

const ImageToolbar = () => {
  return (
    <div style={styles.toolbarCont}>
      <IconButton color="transparent" onClick={() => console.log("Detail page")}>
        <TunesIcon />
      </IconButton>
      <IconButton color="transparent" onClick={() => console.log("Fave 2")}>
        <FavoriteFullIcon />
      </IconButton>
    </div>
  );
};

export default Profile;

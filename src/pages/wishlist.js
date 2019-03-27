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

  goDetails() {
    console.log("Navigate to details");
  }

  toggleFavorite() {
    console.log("Toggle favorite");
  }

  renderWishItem(elem) {
    return (
      <div>
        <div style={styles.imageContainer}>
          <WishListTitle title="Flat White" />
          <WishListImage src="" />
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
          {[1, 2, 3].map(elem => {
            return this.renderWishItem(elem);
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

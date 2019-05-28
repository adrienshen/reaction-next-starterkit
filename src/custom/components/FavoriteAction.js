import React, { Component } from "react";
import { IconButton } from "@material-ui/core";
import { FavoriteIcon } from "../../custom/components/SvgIcons";
import store from "store";

class FavoriteAction extends Component {
  state = {
    product: this.props.product,
    wishlist: {},
  };

  componentDidMount() {
    this.initWishlist();
  }

  initWishlist() {
    const wishlist = store.get("wishlist");

    if (wishlist && Object.keys(wishlist).length) {
      console.log("wishlist has contents: ", wishlist);
      this.setState({ wishlist });
      return;
    }

    store.set("wishlist", {});
  }

  toggleFavorite = () => {
    console.log("Toggling favorite...");
    const { wishlist, product } = this.state;
    const inWishList = wishlist[product.id];

    if (inWishList) {
      this.removeProductFromBrowserStorage();
    } else {
      this.addProductToBrowserStorage();
    }
  };

  addProductToBrowserStorage = () => {
    const nextWishList = {
      ...this.state.wishlist,
      [this.state.product.id]: {
        name: `new product added ${this.state.product.id}`,
        image: this.state.product.image,
      }
    }

    this.setState({ wishlist: nextWishList });
    store.set("wishlist", nextWishList);
  }

  removeProductFromBrowserStorage = () => {
    const { wishlist, product } = this.state;
    const nextWishList = wishlist;
    delete nextWishList[product.id];

    this.setState({ wishlist: nextWishList });
    store.set("wishlist", nextWishList);
  }

  render() {
    const { wishlist, product } = this.state;

    console.log("this.state: ", this.state);
    return (
      <div style={{
        position: "absolute",
        right: 10,
        top: 275,
        zIndex: 999,
      }}>
        <IconButton onClick={this.toggleFavorite}>
          <FavoriteIcon color="#fff" isFaved={wishlist[product.id]} />
        </IconButton>
      </div>
    );
  }
}

export default FavoriteAction;

import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../lib/theme/colors";
import FavoriteAction from "../../custom/components/FavoriteAction";

const styles = theme => ({
  root: {
    width: "100%"
  },
  featured: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing.unit,
    padding: "1rem"
  },
  featuredImage: {
    flex: 0,
    height: "100%"
  }
});

/**
 * Product detail media gallery
 * @class ProductDetailMediaGallery
 */
@withStyles(styles, { withTheme: true, name: "SkMediaGallery" })
class MediaGallery extends Component {
  static propTypes = {
    /**
     * CSS Class names
     */
    classes: PropTypes.object,

    /**
     * Media items
     */
    mediaItems: PropTypes.arrayOf(PropTypes.object),

    /**
     * MUI Theme
     */
    theme: PropTypes.object
  };

  static defaultProps = {
    mediaItems: []
  };

  state = { featuredMediaIndex: 0 };

  /**
   * @name handleMediaItemClick
   * @param {SyntheticEvent} event Event
   * @param {Object} media The `media` prop of the MediaGalleryItem that was clicked
   * @param {Number} index The `index` prop of the MediaGalleryItem that was clicked
   * @returns {undefined} Nothing
   */
  handleMediaItemClick = (event, media, index) => {
    this.setState({ featuredMediaIndex: index });
  };

  renderPlaceHolderImg = () => {
    return (
      <picture>
        <source srcSet="https://loremflickr.com/400/350/furniture?lock=30976" media="(min-width: 800px)" />
        <img height="350" width="400" src="https://loremflickr.com/400/350/furniture?lock=30976" alt="primary" />
      </picture>
    );
  };

  renderFeaturedImage() {
    const { mediaItems } = this.props;

    // Render placeholder, when product does not have images set.
    if (Array.isArray(mediaItems) && mediaItems.length === 0) {
      return this.renderPlaceHolderImg();
    }

    const product = {
      id: "p99",
      name: "a test demo product",
      image: "https://loremflickr.com/400/350/dog?lock=30976",
    }

    return (
      <div>
        <FavoriteAction product={product} />
        <picture style={{ height: "350px", position: "relative" }}>
          <source srcSet="https://loremflickr.com/400/350/dog?lock=30976" media="(min-width: 800px)" />
          <img src="https://loremflickr.com/400/350/dog?lock=30976" alt="primary" />
          {this.renderInformationBar()}
        </picture>
      </div>
    );
  }

  renderInformationBar() {
    const styles = {
      container: {
        position: "absolute",
        width: "100%",
        bottom: 5,
        padding: ".5rem 1rem",
        background: colors.GOLD,
        color: "#fff",
        fontFamily: "Lato, sans-serif",
        display: "flex",
        justifyContent: "space-between",
        opacity: ".75",
        zIndex: 999
      }
    };
    return (
      <div style={styles.container}>
        <span>Vintage Kitchen</span>
        <span>$8,318</span>
      </div>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={12}>
          <div className={classes.featured}>{this.renderFeaturedImage()}</div>
        </Grid>
      </Grid>
    );
  }
}

export default MediaGallery;

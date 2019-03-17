import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Header from "components/Header";
import Footer from "components/Footer";
import MainNavigation from "../MainNavigation";

const styles = theme => ({
  root: {
    minHeight: "100vh",
    marginBottom: "5rem",
  },
  main: {
    flex: "1 1 auto",
    maxWidth: theme.layout.mainContentMaxWidth,
    marginLeft: "auto",
    marginRight: "auto"
  },
  article: {
    padding: 0
  }
});

@withStyles(styles, { name: "SkLayout" })
class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    shop: PropTypes.shape({
      name: PropTypes.string
    }).isRequired,
    viewer: PropTypes.object
  };

  static defaultProps = {
    classes: {}
  };

  render() {
    const { classes, children, shop, viewer } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <Header shop={shop} viewer={viewer} />
          <main className={classes.main}>
            <article className={classes.article}>{children}</article>
          </main>
          <Footer />
          <MainNavigation />
        </div>
      </React.Fragment>
    );
  }
}

export default Layout;

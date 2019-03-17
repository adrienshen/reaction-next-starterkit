import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Categories from "../custom/Categories";

class CategoryScreen extends Component {
  static propTypes = {
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      currency: PropTypes.shape({
        code: PropTypes.string.isRequired
      })
    })
  };

  render() {
    const { shop } = this.props;

    return (
      <Fragment>
        <Helmet
          title={`${"Select product category"} | ${shop && shop.name}`}
          meta={[{ name: "description", content: "" }]}
        />
        <Categories />
      </Fragment>
    );
  }
}

export default CategoryScreen;

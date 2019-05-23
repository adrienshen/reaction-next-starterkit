import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import Helmet from "react-helmet";
// import withCatalogItems from "containers/catalog/withCatalogItems";
import withProductSamples from "containers/catalog/withProductSamples";
import trackProductListViewed from "lib/tracking/trackProductListViewed";
import CategorySample from "../custom/CategorySample";

import FilterWidget from "../custom/components/FilterWidget";
import { IconButton } from "@material-ui/core";

@withProductSamples
@inject("routingStore", "uiStore")
@observer
class View extends Component {
  static propTypes = {
    catalogItems: PropTypes.array,
    catalogItemsPageInfo: PropTypes.object,
    initialGridSize: PropTypes.object,
    isLoadingCatalogItems: PropTypes.bool,
    routingStore: PropTypes.object,
    shop: PropTypes.shape({
      currency: PropTypes.shape({
        code: PropTypes.string.isRequired
      })
    }),
    tag: PropTypes.object,
    uiStore: PropTypes.shape({
      pageSize: PropTypes.number.isRequired,
      setPageSize: PropTypes.func.isRequired,
      setSortBy: PropTypes.func.isRequired,
      sortBy: PropTypes.string.isRequired
    })
  };

  static async getInitialProps({ req }) {
    // It is not perfect, but the only way we can guess at the screen width of the
    // requesting device is to parse the `user-agent` header it sends.
    const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
    const width = (userAgent && userAgent.indexOf("Mobi")) > -1 ? 320 : 1024;

    return { initialGridSize: { width } };
  }

  state = {
    filterOpen: false
  };

  @trackProductListViewed()
  componentDidMount() {
    const { routingStore } = this.props;
    routingStore.setTagId(null);
  }

  componentDidUpdate(prevProps) {
    if (this.props.catalogItems !== prevProps.catalogItems) {
      this.trackEvent(this.props);
    }
  }

  @trackProductListViewed()
  trackEvent() {}

  setPageSize = pageSize => {
    this.props.routingStore.setSearch({ limit: pageSize });
    this.props.uiStore.setPageSize(pageSize);
  };

  setSortBy = sortBy => {
    this.props.routingStore.setSearch({ sortby: sortBy });
    this.props.uiStore.setSortBy(sortBy);
  };

  renderCategorySample() {
    return <CategorySample product={this.props.product} />;
  }

  renderFilterOffCanvas() {
    return <FilterWidget toggleFilter={this.toggleFilter} open={this.state.filterOpen} />;
  }

  toggleFilter = () => {
    this.setState({
      filterOpen: !this.state.filterOpen
    });
  };

  renderSubHeader() {
    return (
      <header>
        <h2>Samples</h2>
        <IconButton onClick={this.toggleFilter}>
          <i>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z" />
            </svg>
          </i>
        </IconButton>
      </header>
    );
  }

  render() {
    const { shop } = this.props;
    const pageTitle = shop && shop.description ? `${shop.name} | ${shop.description}` : shop.name;

    return (
      <Fragment>
        <Helmet title={pageTitle} meta={[{ name: "description", content: shop && shop.description }]} />
        {this.renderSubHeader()}
        {this.renderCategorySample()}
        {this.renderFilterOffCanvas()}
      </Fragment>
    );
  }
}

export default View;

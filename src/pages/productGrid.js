import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import Helmet from "react-helmet";
import withCatalogItems from "containers/catalog/withCatalogItems";
import trackProductListViewed from "lib/tracking/trackProductListViewed";
import { inPageSizes } from "lib/utils/pageSizes";
import { classes } from "istanbul-lib-coverage";

@withCatalogItems
@inject("routingStore", "uiStore")
@observer
class ProductGridPage extends Component {
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

  setPageSize = (pageSize) => {
    this.props.routingStore.setSearch({ limit: pageSize });
    this.props.uiStore.setPageSize(pageSize);
  };

  setSortBy = (sortBy) => {
    this.props.routingStore.setSearch({ sortby: sortBy });
    this.props.uiStore.setSortBy(sortBy);
  };

  renderSearchIcon() {
    return <div>
      SearchIcon
    </div>
  }

  renderSubActions() {
    return <div>
      Filter, and Wishlist
    </div>
  }

  renderGalleryCover() {
    return <section>
      <span>This is the gallery cover.</span>
      <div className={classes.imagesList}>

      </div>
      <div className={classes.overlayControls}>
        {this.renderSearchIcon()}
        {this.renderSubActions()}
      </div>
    </section>
  }

  renderNavigationOptionsCopy() {
    return <section>
      <h3>Not sure what you are looking for?</h3>
      <p>Browse our kitchen sets by categories or by style. Order a sample to make sure that's the right fit for your home.</p>
      <ul>
        <li>
          <img src="/placeholder" alt="" />
          <span>Categories</span>
        </li>
        <li>
          <img src="/placeholder" alt="" />
          <span>Styles</span>
        </li>
        <li>
          <img src="/placeholder" alt="" />
          <span>Samples</span>
        </li>
      </ul>
    </section>
  }

  renderOtherOptionsCopy() {
    return <section>
      <div>
        <h3>Looking for inspiration?</h3>
        <p>Browse our idea gallery and save designs you like for later.</p>
        <button>Browse</button>
      </div>
      <div>
        <h3>Let our professionals do the work</h3>
        <p>Have something on your mind? Contact our designers and get designs for your dream kitchen in a day.</p>
        <button>Contact</button>
      </div>
      <div>
        <h3>Measure your kitchen</h3>
        <p>Not sure how to measure your kitchen? Follow our measuring guideline or contact our designers to help you.</p>
        <button>Get Help</button>
      </div>
    </section>
  }

  renderContactUsCopy() {
    return <section>
      <h3>Grow your business</h3>
      <p>Are you a reseller and want to expand your business and become our partner?</p>
      <button>Contact Us</button>
    </section>
  }

  render() {
    const {
      shop,
    } = this.props;
    const pageTitle = shop && shop.description ? `${shop.name} | ${shop.description}` : shop.name;

    return (
      <Fragment>
        <Helmet
          title={pageTitle}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        {this.renderGalleryCover()}
        {this.renderNavigationOptionsCopy()}
        {this.renderOtherOptionsCopy()}
        {this.renderContactUsCopy()}
      </Fragment>
    );
  }
}

export default ProductGridPage;

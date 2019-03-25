import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import hoistNonReactStatic from "hoist-non-react-statics";
import catalogItemProductQuery from "./catalogItemProduct.gql";

/**
 * withProductSamples higher order query component for fetching primaryShopId and catalog data
 * @name WithProductSamples
 * @param {React.Component} Component to decorate and apply
 * @returns {React.Component} - component decorated with primaryShopId and catalog as props
 */
export default function WithProductSamples(Component) {
  class WithCatalogItemProduct extends React.Component {
    static propTypes = {
      router: PropTypes.object.isRequired
    };

    render() {
      const {
        router,
      } = this.props;

      console.info("Cabinet samples loaded: ");

      return (
        <Query errorPolicy="all" query={catalogItemProductQuery} variables={{ slugOrId: "cabinet-samples" }}>
          {({ data, loading }) => {
            console.log("In withProductSamples data from GraphQL: ", data);
            const { catalogItemProduct } = data || {};
            const { product } = catalogItemProduct || {};

            return <Component {...this.props} isLoadingProduct={loading} product={product} />;
          }}
        </Query>
      );
    }
  }

  hoistNonReactStatic(WithCatalogItemProduct, Component);

  return WithCatalogItemProduct;
}

import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import hoistNonReactStatic from "hoist-non-react-statics";
import catalogItemProductQuery from "./catalogItemProduct.gql";

/**
 * WithCategoryVerticals higher order query component for fetching primaryShopId and catalog data
 * @name WithCategoryVerticals
 * @param {React.Component} Component to decorate and apply
 * @returns {React.Component} - component decorated with primaryShopId and catalog as props
 */
export default (Component) => {
  class WithCategoryVerticals extends React.Component {
    static propTypes = {
      router: PropTypes.object.isRequired
    };

    render() {
      const {
        router,
      } = this.props;

      return (
        <Query
          errorPolicy="all"
          query={catalogItemProductQuery}
          variables={{ slugOrId: "kitchen" }}
        >
          {({ data, loading }) => {
            console.log("Data from GraphQL: ", data);
            const { catalogItemProduct } = data || {};
            const { product } = catalogItemProduct || {};

            return <Component {...this.props} isLoadingProduct={loading} product={product} />;
          }}
        </Query>
      );
    }
  }

  hoistNonReactStatic(WithCategoryVerticals, Component);

  return WithCategoryVerticals;
}

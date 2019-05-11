import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import hoistNonReactStatic from "hoist-non-react-statics";
import { withApollo } from "react-apollo";
import { sendDesignerForm } from "./mutations.gql";

export default function withContactDesigners(Comp) {
  @withApollo
  class WithContactDesigners extends Component {
    static PropTypes = {
      client: PropTypes.shape({
        query: PropTypes.func.isRequired
      })
    };

    state = {};

    onSendForm = async ({ name, email, room, budget, contents }) => {
      const { client: apolloClient } = this.props;

      const $input = {
        shopId: "J8Bhq3uTtdgwZx3rz",
        senderName: name,
        senderEmail: email,
        room,
        budget,
        contents,
      };

      console.log("input: ", $input);

      const results = await apolloClient.mutate({
        mutation: sendDesignerForm,
        variables: { input: $input }
      });

      console.log("mutate results: ", results);
      return results;
    };

    render() {
      return (
        <Fragment>
          <Comp onSendForm={this.onSendForm} {...this.props} />
        </Fragment>
      );
    }
  }

  hoistNonReactStatic(WithContactDesigners, Comp);

  return WithContactDesigners;
}

import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import withAddressBook from "containers/address/withAddressBook";
import ErrorPage from "pages/_error";

const styles = (theme) => ({
  accountProfileInfoContainer: {
    marginBottom: theme.spacing.unit * 4
  }
});

@withStyles(styles)
@withAddressBook
@inject("authStore")
@inject("uiStore")
@observer
class PersonalInformation extends Component {
  static propTypes = {
    authStore: PropTypes.shape({
      account: PropTypes.object.isRequired
    }),
    classes: PropTypes.object,
    onAddressAdded: PropTypes.func.isRequired,
    onAddressDeleted: PropTypes.func.isRequired,
    onAddressEdited: PropTypes.func.isRequired,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }),
  };

  renderAddressBook() {
    return (
      <div>FFF</div>
    );
  }

  render() {
    const { authStore: { account }, shop } = this.props;

    if (account && !account._id) return <ErrorPage shop={shop} subtitle="Not Found" />;

    return (
      <Grid item xs={12} md={12}>
        {this.renderAddressBook()}
      </Grid>
    );
  }
}

export default PersonalInformation;

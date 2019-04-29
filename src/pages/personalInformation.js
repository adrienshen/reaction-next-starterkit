import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";
import { PersonalSectionTitle } from "../custom/components/Text";
import { Divider } from "@material-ui/core";
import { Button } from "../custom/components/Buttons";
import { RoundedTextInput } from "../custom/components/Inputs";

@inject("authStore")
@inject("uiStore")
@observer
class UserPersonalInformation extends Component {
  static propTypes = {
    authStore: PropTypes.shape({
      account: PropTypes.object.isRequired
    }),
  };

  state = {
    editMode: true,
  }

  editMode = () => {
    this.setState({
      editMode: true,
    });
  }

  onInputChange = ({ target }) => {
    console.log("value: ", target.value);
  }

  renderPersonalInformation() {
    return <section style={{ padding: "1rem" }}>
      Display user personal information
      <div style={{ margin: "2rem 0rem" }}>
        <PersonalSectionTitle title="Account Information" />
        <InfoLine label="Name" value="John Doe" type="text" />
        <InfoLine label="Email" value="johndoe@gmail.com" type="text" />
        <InfoLine label="Password" value="somepassword" type="password" />
      </div>

      <Divider />

      <div style={{ margin: "2rem 0rem" }}>
        <PersonalSectionTitle title="Billing Address" />
        <InfoLine label="Address" value="Some Address" />
        <InfoLine label="City" value="New York" />
        <InfoLine label="State" value="USA" />
        <InfoLine label="Zipcode" value="12315" />
        <InfoLine label="Phone" value="+123456789" />
      </div>

      <div style={{ margin: "2rem 0rem" }}>
        <PersonalSectionTitle title="Shipping Address" />
        <InfoLine label="Address" value="Some Address" />
        <InfoLine label="City" value="New York" />
        <InfoLine label="State" value="USA" />
        <InfoLine label="Zipcode" value="12315" />
        <InfoLine label="Phone" value="+123456789" />
      </div>

      <Button type="hollow" text="Edit" size="m"
        onClick={this.editMode}
      >
        Edit
      </Button>
    </section>
  }

  renderEdit() {
    return <section style={{ padding: "2rem" }}>
      <PersonalSectionTitle title="Account Information" />
      <section style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-evenly" }}>
        <RoundedTextInput onChange={this.onInputChange} value="John" width="49%" />
        <RoundedTextInput onChange={this.onInputChange} value="John" width="49%" />
        <RoundedTextInput onChange={this.onInputChange} value="John" width="100%" />
        <RoundedTextInput onChange={this.onInputChange} value="John" width="100%" />
      </section>
      <Button type="standard" text="SAVE" size="m" onClick={() => console.log("Saving...")}>Save</Button>
    </section>
  }

  render() {
    const {
      authStore: { account },
      shop
    } = this.props;

    console.log("user account: ", account);

    // If there is no logged in user, return Not Found page
    // if (account && !account._id) return <ErrorPage shop={shop} subtitle="Not Found" />;

    return (
      <Fragment>
        <Helmet
          title={`Account Profile | ${shop && shop.name}`}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        {this.state.editMode ? this.renderEdit() : this.renderPersonalInformation()}
      </Fragment>
    );
  }
}

function InfoLine({label, value, type}) {
  return (
    <div style={{
      display: "flex",
      padding: ".5rem 1rem",
      flexFlow: "row no-wrap",
      justifyContent: "space-between",
      width: "80%",
    }}>
      <span style={{
        fontSize: "16px",
        color: "#B09A51",
        fontFamily: "Lato",
      }}>{label}</span>
      <input readOnly={true} style={{
        fontSize: "16px",
        outline: "none",
        border: "none",

      }} type={type} value={value} />
    </div>
  )
}

export default UserPersonalInformation;

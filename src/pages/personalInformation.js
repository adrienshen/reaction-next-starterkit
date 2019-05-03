import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";
import { PersonalSectionTitle } from "../custom/components/Text";
import { Divider } from "@material-ui/core";
import { Button } from "../custom/components/Buttons";
import { RoundedTextInput, OptionsSelect } from "../custom/components/Inputs";
// import ToggleSwitch from "../custom/components/ToggleSwitch";
import withAddressBook from "containers/address/withAddressBook";

import PersonalInformation from "../custom/PersonalInformation";
import withViewer from "../containers/account/withViewer";

@withViewer
@withAddressBook
@inject("authStore")
@inject("uiStore")
@observer
class UserPersonalInformation extends Component {
  static propTypes = {
    authStore: PropTypes.shape({
      account: PropTypes.object.isRequired
    })
  };

  state = {
    editMode: true,
    personalDetails: {},
    billingAddress: {},
    shippingAddress: {},
  };

  componentDidMount() {
    console.log("THIS.PROPS: ", this.props);

    const { addressBook } = this.props.viewer;
    const firstBillingAddress = addressBook.edges.filter(edge => {
      return edge.node.isBillingDefault;
    })[0];

    const firstShippingAddress = addressBook.edges.filter(edge => {
      return edge.node.isBillingDefault;
    })[0];

    console.log("HERE: ", firstBillingAddress, firstShippingAddress);

    this.setState({
      billingAddress: firstBillingAddress || {
        address1: "",
        city: "",
        country: "",
        postal: "",
        phone: "",
      },
      shippingAddress: firstShippingAddress || {
        address1: "",
        city: "",
        country: "",
        postal: "",
        phone: "",
      },
    });

  }

  editMode = () => {
    this.setState({
      editMode: true
    });
  };

  onInputChange = ({ target }) => {
    console.log("value: ", target.value);
  };

  onBillingAddressInputChange = (field, value) => {
    const billingAddress = { ...this.state.billingAddress, [field]: value };
    this.setState({
      billingAddress,
    });
  }

  onShippingAddressInputChange = (field, value) => {
    const shippingAddress = { ...this.state.shippingAddress, [field]: value };
    this.setState({
      shippingAddress,
    });
  }

  renderPersonalInformation() {
    const { addressBook, primaryEmailAddress } = this.props.viewer;
    const { fullName, address1, city, country, postal, phone } = addressBook.edges[0].node;
    console.log(addressBook, primaryEmailAddress);

    return (
      <section style={{ padding: "1rem" }}>
        Display user personal information
        <div style={{ margin: "2rem 0rem" }}>
          <PersonalSectionTitle title="Account Information" />
          <InfoLine label="Name" value={fullName} type="text" />
          <InfoLine label="Email" value={primaryEmailAddress} type="text" />
          <InfoLine label="Password" value="somepassword" type="password" />
        </div>
        <Divider />
        <div style={{ margin: "2rem 0rem" }}>
          <PersonalSectionTitle title="Billing Address" />
          <InfoLine label="Address" value={``} />
          <InfoLine label="City" value={``} />
          <InfoLine label="State" value={``} />
          <InfoLine label="Zipcode" value={``} />
          <InfoLine label="Phone" value={``} />
        </div>
        <div style={{ margin: "2rem 0rem" }}>
          <PersonalSectionTitle title="Shipping Address" />
          <InfoLine label="Address" value={address1} />
          <InfoLine label="City" value={city} />
          <InfoLine label="State" value={country} />
          <InfoLine label="Zipcode" value={postal} />
          <InfoLine label="Phone" value={phone} />
        </div>
        <Button
          type="hollow"
          text="Edit"
          size="m"
          onClick={this.editMode}
        >
          Edit
        </Button>
      </section>
    );
  }

  renderEdit() {
    const { addressBook, primaryEmailAddress } = this.props.viewer;
    if (!this.props.viewer) return null;
    const { fullName } = addressBook.edges[0].node;
    console.log(addressBook, primaryEmailAddress);

    return (
      <section>
        <PersonalSectionTitle title="Account Information" />
        <section style={{ padding: "2rem", display: "flex", flexFlow: "row wrap", justifyContent: "space-evenly" }}>
          <RoundedTextInput onChange={this.onInputChange} value={fullName || ""} width="49%" />
          <RoundedTextInput onChange={this.onInputChange} value="" width="49%" />
          <RoundedTextInput onChange={this.onInputChange} value={primaryEmailAddress || ""} width="100%" />
          <RoundedTextInput
            placeholder="new password"
            onChange={this.onInputChange}
            value=""
            width="100%"
            type="password"
          />
          {/* on blur send updated password */}
          <RoundedTextInput
            placeholder="confirm password"
            onChange={this.onInputChange}
            value=""
            width="100%"
            type="password"
          />
        </section>
        {this.renderBillingAddressForm()}
        {this.renderShippingAddressToggle()}
        {this.renderShippingAddressForm()}
        <Button type="standard" text="SAVE" size="m" onClick={() => console.log("Saving...")}>
          Save
        </Button>
      </section>
    );
  }

  renderBillingAddressForm() {
    const { address1, city, country, postal, phone } = this.state.billingAddress || {};
    return (
      <React.Fragment>
        <PersonalSectionTitle title="Billing Address" />
        <section style={{ padding: "2rem", display: "flex", flexFlow: "row wrap", justifyContent: "space-evenly" }}>
          <RoundedTextInput
            placeholder="Address 1"
            onChange={({ target }) => this.onBillingAddressInputChange("address1", target.value)}
            value={address1 || ``}
            width="49.5%"
          />
          <RoundedTextInput
            placeholder="City"
            onChange={({ target }) => this.onBillingAddressInputChange("city", target.value)}
            value={city || ``}
            width="49.5%"
          />
          <OptionsSelect
            currentValue={country || `USA`}
            dataOptions={["USA", "China"]}
            onSelect={value => console.log(value)}
          />
          <RoundedTextInput
            placeholder="12315"
            onChange={({ target }) => this.onBillingAddressInputChange("postal", target.value)}
            value={postal || ``}
            width="30%"
            type="text"
          />
          <RoundedTextInput
            placeholder="Phone number"
            onChange={({ target }) => this.onBillingAddressInputChange("phone", target.value)}
            value={phone || ``}
            width="68%"
            type="text"
          />
        </section>
      </React.Fragment>
    );
  }

  renderShippingAddressForm() {
    const { address1, city, country, postal, phone } = (this.state.shippingAddress || {});

    return (
      <React.Fragment>
        <PersonalSectionTitle title="Shipping Address" />
        <section style={{ padding: "2rem", display: "flex", flexFlow: "row wrap", justifyContent: "space-evenly" }}>
          <RoundedTextInput
            placeholder="Address 1"
            onChange={(e) => this.onShippingAddressInputChange("address1", e.target.value)}
            value={address1 || ``}
            width="49.5%"
          />
          <RoundedTextInput
            placeholder="City"
            onChange={({ target }) => this.onShippingAddressInputChange("city", target.value)}
            value={city || ``}
            width="49.5%"
          />
          <OptionsSelect
            currentValue={country || `USA`}
            dataOptions={["USA", "China"]}
            onSelect={({ target }) => this.onShippingAddressInputChange("country", target.value)}
          />
          <RoundedTextInput
            placeholder="12315"
            onChange={({ target }) => this.onShippingAddressInputChange("postal", target.value)}
            value={postal || ``}
            width="30%"
            type="text"
          />
          <RoundedTextInput
            placeholder="Phone number"
            onChange={({ target }) => this.onShippingAddressInputChange("phone", target.value)}
            value={phone || ``}
            width="68%"
            type="text"
          />
        </section>
      </React.Fragment>
    );
  }

  renderShippingAddressToggle() {
    return (
      <React.Fragment>
        <PersonalSectionTitle title="Account Information" />
        <div>
          <span>Same as billing addresss</span>
          <div>TOGGLE HERE</div>
        </div>
      </React.Fragment>
    );
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
        {/* <PersonalInformation /> */}
      </Fragment>
    );
  }
}

function InfoLine({ label, value, type }) {
  return (
    <div
      style={{
        display: "flex",
        padding: ".5rem 1rem",
        flexFlow: "row no-wrap",
        justifyContent: "space-between",
        width: "80%"
      }}
    >
      <span
        style={{
          fontSize: "16px",
          color: "#B09A51",
          fontFamily: "Lato"
        }}
      >
        {label}
      </span>
      <input
        readOnly={true}
        style={{
          fontSize: "16px",
          outline: "none",
          border: "none"
        }}
        type={type}
        value={value}
      />
    </div>
  );
}

export default UserPersonalInformation;

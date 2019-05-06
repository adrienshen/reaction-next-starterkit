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
import ErrorPage from "../pages/_error";
import withViewer from "../containers/account/withViewer";
import { Router } from "routes";
import { Formik } from 'formik';
import { AddressSchema, PersonalInformationSchema } from "../lib/validations";

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
    fieldErrors: {
      billingAddress: {
        address1: "",
        city: "",
        country: "",
        postal: "",
        phone: "",
      },
      shippingAddress: {
        address1: "",
        city: "",
        country: "",
        postal: "",
        phone: "",
      }
    },
  };

  componentDidMount() {
    console.log("THIS.PROPS: ", this.props);
    if (!this.props.viewer) {
      console.warn("Viewer is null");
      Router.pushRoute("/login");
      return;
    }
    const { primaryEmailAddress, addressBook } = this.props.viewer;

    let firstBillingAddress;
    let firstShippingAddress;
    if (addressBook) {
      [firstBillingAddress] = addressBook.edges.filter(edge => {
        return edge.node.isBillingDefault;
      });
  
      [firstShippingAddress] = addressBook.edges.filter(edge => {
        return edge.node.isBillingDefault;
      });
    }

    console.log("primaryEmailAddress: ", primaryEmailAddress);

    // Use the billing address as the customer personal information
    const personalDetails = {
      firstName: firstBillingAddress && firstBillingAddress.firstName || "",
      lastName: firstBillingAddress && firstBillingAddress.lastName || "",
      primaryEmailAddress,
      // Password can not be queried from GraphQL, so this will probably be a reset password button
      resetPassword: "",
      confirmPassword: "",
    };

    const billingAddress = firstBillingAddress || {
      address1: "",
      city: "",
      country: "",
      postal: "",
      phone: "",
    }

    const shippingAddress = firstShippingAddress || {
      address1: "",
      city: "",
      country: "",
      postal: "",
      phone: "",
    }

    this.setState({
      personalDetails,
      billingAddress,
      shippingAddress,
    });
  }

  editMode = () => {
    this.setState({
      editMode: true
    });
  };

  saveBillingAddress = address => {
    console.log("ready for saving... ", address);
  }

  saveShippingAddress = address => {
    console.log("ready for saving... ", address);
  }

  onInputChange = ({ target }) => {
    console.log("value: ", target.value);
  };

  renderPersonalInformation() {
    const { shippingAddress, billingAddress, personalDetails } = this.state;

    return (
      <section style={{ padding: "1rem" }}>
        Display user personal information
        {this.renderPersonalStatic(personalDetails, billingAddress)}
        <Divider />
        {this.renderAddressStatic(billingAddress)}
        {this.renderAddressStatic(shippingAddress)}
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

  renderPersonalStatic({ primaryEmailAddress }, { firstName, lastName }) {
    return (
      <div style={{ margin: "2rem 0rem" }}>
        <PersonalSectionTitle title="Account Information" />
        <InfoLine label="Name" value={`${firstName} ${lastName}`} type="text" />
        <InfoLine label="Email" value={primaryEmailAddress} type="text" />
        <InfoLine label="Password" value="somepassword" type="password" />
      </div>
    )
  }

  renderAddressStatic({ address1, city, country, postal, phone }) {
    return (
      <div style={{ margin: "2rem 0rem" }}>
        <PersonalSectionTitle title="Shipping Address" />
        <InfoLine label="Address" value={address1} />
        <InfoLine label="City" value={city} />
        <InfoLine label="State" value={country} />
        <InfoLine label="Zipcode" value={postal} />
        <InfoLine label="Phone" value={phone} />
      </div>
    )
  }

  renderEdit() {
    if (!this.props.viewer) return null;
    // const { primaryEmailAddress } = this.props.viewer;
    // const { fullName } = this.state.billingAddress;

    return (
      <section>
        <PersonalSectionTitle title="Account Information" />
        <section style={{
          padding: "2rem",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-evenly"
        }}>
          {this.renderPersonalDetailsForm()}
        </section>
        {this.renderShippingAddressToggle()}
        {this.renderAddressFormik(this.state.shippingAddress, this.saveShippingAddress)}
        {this.renderAddressFormik(this.state.billingAddress, this.saveBillingAddress)}
        <Button
          type="standard"
          text="SAVE"
          size="m"
          onClick={this.onFormSave}
        >
          Save
        </Button>
      </section>
    );
  }

  renderPersonalDetailsForm() {
    const { primaryEmailAddress } = this.state.personalDetails;
    const { firstName, lastName } = this.state.billingAddress;

    return (
      <Formik
        initialValues={{
          firstName,
          lastName,
          primaryEmailAddress,
          password: "",
          confirmPassword: "",
        }}
        validationSchema={PersonalInformationSchema}
        onSubmit={(values, actions) => {
          console.log("HERE: ", values, actions);



          // onSave(values).then(
          //   updatedUser => {
          //     actions.setSubmitting(false);
          //     updateUser(updatedUser);
          //     onClose();
          //   },
          //   error => {
          //     actions.setSubmitting(false);
          //     actions.setErrors(transformMyRestApiErrorsToAnObject(error));
          //     actions.setStatus({ msg: 'Set some arbitrary status or data' });
          //   }
          // );
        }}
        render={({
          values,
          errors,
          status,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "space-evenly"
            }}
            onSubmit={handleSubmit}>
            <RoundedTextInput
              placeholder="First name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              width="49.5%"
              type="text"
              name="firstName"
            />
            {errors.firstName && touched.firstName && <ValidationError message={errors.firstName} />}

            <RoundedTextInput
              placeholder="Last name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
              width="49.5%"
              type="text"
              name="lastName"
            />
            {errors.lastName && touched.lastName && <ValidationError message={errors.lastName} />}

            <RoundedTextInput
              placeholder="Email address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.primaryEmailAddress}
              width="100%"
              type="text"
              name="primaryEmailAddress"
            />
            {errors.primaryEmailAddress && touched.primaryEmailAddress && <ValidationError message={errors.primaryEmailAddress} />}

            <RoundedTextInput
              placeholder="*****"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              width="100%"
              type="password"
              name="password"
            />
            {errors.password && touched.password && <ValidationError message={errors.password} />}

            <RoundedTextInput
              placeholder="*****"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              width="100%"
              type="password"
              name="confirmPassword"
            />
            {errors.confirmPassword && touched.confirmPassword && <ValidationError message={errors.confirmPassword} />}

            <Button
              type="standard"
              htmlType="submit"
              text="SAVE"
              size="l"
              disabled={isSubmitting}
            />
          </form>
        )}
      />
    )
  }

  renderAddressFormik(address, onSave) {
    return (
      <Formik
        initialValues={{
          address1: address.address1 || "",
          city: address.city || "",
          country: address.country || "",
          postal: address.postal || "",
          phone: address.phone || "",
          region: address.phone || "",
          fullName: "Default customer",
          isCommercial: false,
        }}
        validationSchema={AddressSchema}
        onSubmit={(values, actions) => {
          // console.log(values, actions);
          onSave(values, actions);

          console.log("this.props: ", this.props);
          // this.props.onAddressAdded(values);

          // onSave(values).then(
          //   updatedUser => {
          //     actions.setSubmitting(false);
          //     updateUser(updatedUser);
          //     onClose();
          //   },
          //   error => {
          //     actions.setSubmitting(false);
          //     actions.setErrors(transformMyRestApiErrorsToAnObject(error));
          //     actions.setStatus({ msg: 'Set some arbitrary status or data' });
          //   }
          // );
        }}
        render={({
          values,
          errors,
          status,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form style={{ padding: "2rem", display: "flex", flexFlow: "row wrap", justifyContent: "space-evenly" }}
            onSubmit={handleSubmit}>
            <RoundedTextInput
              placeholder="Address 1"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address1}
              width="49.5%"
              type="text"
              name="address1"
            />
            {errors.address1 && touched.address1 && <ValidationError message={errors.address1} />}

            <RoundedTextInput
              placeholder="City"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.city}
              width="49.5%"
              type="text"
              name="city"
            />
            {errors.city && touched.city && <ValidationError message={errors.email} />}

            <OptionsSelect
              currentValue={values.country || `USA`}
              dataOptions={["USA", "China", "Singapore"]}
              onSelect={handleChange}
              name="country"
              width="49.5%"
            />

            <RoundedTextInput
              placeholder="Region"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.region}
              width="49.5%"
              type="text"
              name="region"
            />

            <RoundedTextInput
              placeholder="Postal"
              onChange={handleChange}
              value={values.postal}
              width="30%"
              type="text"
              name="postal"
            />
            {errors.postal && touched.postal && <ValidationError message={errors.postal} />}

            <RoundedTextInput
              placeholder="Phone number"
              onChange={handleChange}
              value={values.phone}
              width="68%"
              type="text"
              name="phone"
            />
            {errors.phone && touched.phone && <ValidationError message={errors.phone} />}

            <Button
              type="standard"
              htmlType="submit"
              text="SAVE"
              size="l"
              disabled={isSubmitting}
            />
          </form>
        )}
      />
    )
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

    // If there is no logged in user, return Not Found page
    if (account && !account._id) return <ErrorPage shop={shop} subtitle="Not Found" />;

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

function ValidationError({ message }) {
  return <div style={{
    width: "100%",
    color: "red"
  }}>{message}</div>
}

export default UserPersonalInformation;

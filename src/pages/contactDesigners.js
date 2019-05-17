import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";
import AccountProfileInfo from "@reactioncommerce/components/AccountProfileInfo/v1";
import { ComponentSectionTitle } from "../custom/components/Text";
import { Formik } from "formik";
import { RoundedTextInput, OptionsSelect, DetailsBox } from "../custom/components/Inputs";
import { Button } from "../custom/components/Buttons";
import withContactDesigners from "../custom/containers/contact/withContactDesigners";
import { DesignerContactFormSchema } from "../lib/validations";

const styles = {
  accountProfileInfoContainer: {
    marginBottom: "4rem"
  },
  avatarName: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center"
  },
  line: {
    margin: "2rem 0rem 3rem 1rem",
    display: "flex"
  },
  link: {
    color: "#404040",
    fontSize: "17px",
    marginLeft: "1rem",
    fontFamily: "Lato, sans-serif",
    textDecoration: "none"
  }
};

@inject("uiStore")
@observer
@withContactDesigners
class ContactDesigners extends Component {
  static propTypes = {
    authStore: PropTypes.shape({
      account: PropTypes.object.isRequired
    }),
    classes: PropTypes.object,
    onSubmitForm: PropTypes.function,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  };

  state = {
    formSent: false
  };

  componentDidMount() {
    console.log("this.props. :: ", this.props);
  }

  renderAccountProfileInfo() {
    const {
      authStore: { account }
    } = this.props;

    return (
      <div style={styles.accountProfileInfoContainer}>
        <AccountProfileInfo viewer={account} />
      </div>
    );
  }

  showThankYou = () => this.setState({ formSent: true });

  render() {
    const { shop } = this.props;

    return (
      <Fragment>
        <Helmet
          title={`Account Profile | ${shop && shop.name}`}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        <section>
          <section className="navigation-items">
            <ComponentSectionTitle title="Personal Information" />
            <section style={{ padding: "1rem" }} className="history">
              {this.state.formSent ? (
                <span>Thanks for your inquiry</span>
              ) : (
                <ContactForm onSendForm={this.props.onSendForm} showThankYou={this.showThankYou} />
              )}
            </section>
          </section>
        </section>
      </Fragment>
    );
  }
}

const ContactForm = ({ onSendForm, showThankYou }) => {
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          room: "",
          budget: "",
          contents: ""
        }}
        onSubmit={async (values, actions) => {
          setTimeout(async () => {
            // alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(true);
            const results = await onSendForm(values);
            if (results) {
              actions.setSubmitting(false);
              actions.resetForm();
              showThankYou();
            }
          }, 1000);
        }}
        validationSchema={DesignerContactFormSchema}
        render={({ values, handleChange, handleSubmit, errors, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <RoundedTextInput
              width="100%"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
              type="text"
              name="name"
            />
            {errors.name && <div id="feedback">{errors.name}</div>}

            <RoundedTextInput
              width="100%"
              placeholder="Email address"
              value={values.email}
              onChange={handleChange}
              type="email"
              name="email"
            />
            {errors.email && <div id="feedback">{errors.email}</div>}

            <p>Tell us more about your project</p>
            <OptionsSelect
              dataOptions={["Kitchen", "Bedroom", "Bathroom", "Living Room", "Outdoor"]}
              onSelect={handleChange}
              name="room"
              width="100%"
              placeholder="Name"
              value={values.room}
            />
            {errors.room && <div id="feedback">{errors.room}</div>}

            <OptionsSelect
              dataOptions={[
                "$0 - $5,000",
                "$5000 - $15,000",
                "$15,000 - $30,000",
                "> $30,000"
              ]}
              onSelect={handleChange}
              name="budget"
              width="100%"
              placeholder="Budget"
              value={values.budget}
            />
            {errors.budget && <div id="feedback">{errors.budget}</div>}

            <DetailsBox name="contents" value={values.contents} placeholder="You message" onChange={handleChange} />

            <div style={{ textAlign: "center" }}>
              <Button
                disabled={isSubmitting}
                type="standard"
                htmlType="submit"
                text="Send"
                onClick={handleSubmit}
                sizeStyles="m"
              />
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default ContactDesigners;

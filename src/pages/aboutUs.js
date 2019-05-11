import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";
import AccountProfileInfo from "@reactioncommerce/components/AccountProfileInfo/v1";
import { ComponentSectionTitle, Body } from "../custom/components/Text";
import TeamProfile from "../custom/components/TeamProfile";

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

@inject("authStore")
@inject("uiStore")
@observer
class AboutIndex extends Component {
  static propTypes = {
    authStore: PropTypes.shape({
      account: PropTypes.object.isRequired
    }),
    classes: PropTypes.object,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  };

  renderAccountProfileInfo() {
    const {
      authStore: { account },
    } = this.props;

    return (
      <div style={styles.accountProfileInfoContainer}>
        <AccountProfileInfo viewer={account} />
      </div>
    );
  }

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
            <ComponentSectionTitle title="Our History" />
            <section style={{ padding: "1rem" }} className="history">
              <Body content="Lorem ipsum dolor sit amet, sea audiam imperdiet an. An recteque persecuti his, cu quaeque veritus copiosae eam, elit viris ne eam. Vel ei populo fastidii. Et invidunt tacimates definitionem vel. Pri an quaestio postulant, eius vituperata mea cu. Et his ullum feugiat signiferumque, veri dolor no qui, nam equidem omittam ancillae cu." />
              <Body content="Lorem ipsum dolor sit amet, sea audiam imperdiet an. An recteque persecuti his, cu quaeque veritus copiosae eam, elit viris ne eam. Vel ei populo fastidii. Et invidunt tacimates definitionem vel. Pri an quaestio postulant, eius vituperata mea cu. Et his ullum feugiat signiferumque, veri dolor no qui, nam equidem omittam ancillae cu." />
            </section>

            <section className="our-team">
              <ComponentSectionTitle title="Our History" />
              <section style={{
                padding: "1rem",
                display: "flex",
                flexFlow: "row wrap",
                justifyContent: "space-evenly"
              }}>
                <TeamProfile image="staff1" fullName="Staff 1" />
                <TeamProfile image="staff2" fullName="Staff 2" />
                <TeamProfile image="staff3" fullName="Staff 3" />
                <TeamProfile image="staff4" fullName="Staff 4" />
              </section>
            </section>

          </section>
        </section>
      </Fragment>
    );
  }
}

export default AboutIndex;

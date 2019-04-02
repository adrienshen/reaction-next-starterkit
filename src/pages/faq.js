import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";
import AccountProfileInfo from "@reactioncommerce/components/AccountProfileInfo/v1";
import { H2, UserName } from "../custom/components/Text";

const styles = {
  accountProfileInfoContainer: {
    marginBottom: "4rem"
  },
  sectionHeader: {
    color: "#B09A51",
    fontFamily: "Lato, sans-serif",
    fontSize: "17px",
    margin: "2rem 0rem",
  },
  body: {
    color: "#4E4E4E",
    fontFamily: "Lato, sans-serif",
    fontSize: "15px",
  }
};

@inject("authStore")
@inject("uiStore")
@observer
class Faq extends Component {
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
        <section style={{ padding: "2rem" }}>
          <h2 style={styles.sectionHeader}>Cabinets</h2>

          <div>
            <h2 style={styles.sectionHeader}>Where can I buy your cabinets?</h2>
            <p style={styles.body}>
              Lorem ipsum dolor sit amet, sea audiam imperdiet an. An recteque persecuti his, cu quaeque veritus
              copiosae eam, elit viris ne eam. Vel ei populo fastidii. Et invidunt tacimates definitionem vel. Pri an
              quaestio postulant, eius vituperata mea cu. Et his ullum feugiat signiferumque, veri dolor no qui, nam
              equidem omittam ancillae cu. Propriae officiis at has, posse insolens has ne, simul blandit sed et. Ei
              nisl imperdiet sed. Ea nisl instructior disputationi per. Cu nam commodo disputationi, te cum dicit
              laoreet.
            </p>
          </div>

          <div>
            <h2 style={styles.sectionHeader}>What is 10x10 Kitchen</h2>
            <p style={styles.body}>
              Lorem ipsum dolor sit amet, sea audiam imperdiet an. An recteque persecuti his, cu quaeque veritus
              copiosae eam, elit viris ne eam. Vel ei populo fastidii. Et invidunt tacimates definitionem vel. Pri an
              quaestio postulant, eius vituperata mea cu. Et his ullum feugiat signiferumque, veri dolor no qui, nam
              equidem omittam ancillae cu. Propriae officiis at has, posse insolens has ne, simul blandit sed et. Ei
              nisl imperdiet sed. Ea nisl instructior disputationi per. Cu nam commodo disputationi, te cum dicit
              laoreet.
            </p>
          </div>

          <div>
            <h2 style={styles.sectionHeader}>How to get samples for different cabinets?</h2>
            <p style={styles.body}>
              Lorem ipsum dolor sit amet, sea audiam imperdiet an. An recteque persecuti his, cu quaeque veritus
              copiosae eam, elit viris ne eam. Vel ei populo fastidii. Et invidunt tacimates definitionem vel. Pri an
              quaestio postulant, eius vituperata mea cu. Et his ullum feugiat signiferumque, veri dolor no qui, nam
              equidem omittam ancillae cu. Propriae officiis at has, posse insolens has ne, simul blandit sed et. Ei
              nisl imperdiet sed. Ea nisl instructior disputationi per. Cu nam commodo disputationi, te cum dicit
              laoreet.
            </p>
          </div>

          <div>
            <h2 style={styles.sectionHeader}>Do you have cabinets that don't slam the door when shut?</h2>
            <p style={styles.body}>
              Lorem ipsum dolor sit amet, sea audiam imperdiet an. An recteque persecuti his, cu quaeque veritus
              copiosae eam, elit viris ne eam. Vel ei populo fastidii. Et invidunt tacimates definitionem vel. Pri an
              quaestio postulant, eius vituperata mea cu. Et his ullum feugiat signiferumque, veri dolor no qui, nam
              equidem omittam ancillae cu. Propriae officiis at has, posse insolens has ne, simul blandit sed et. Ei
              nisl imperdiet sed. Ea nisl instructior disputationi per. Cu nam commodo disputationi, te cum dicit
              laoreet.
            </p>
          </div>

          <div>
            <h2 style={styles.sectionHeader}>What do I choose - pulls or hinges?</h2>
            <p style={styles.body}>
              Lorem ipsum dolor sit amet, sea audiam imperdiet an. An recteque persecuti his, cu quaeque veritus
              copiosae eam, elit viris ne eam. Vel ei populo fastidii. Et invidunt tacimates definitionem vel. Pri an
              quaestio postulant, eius vituperata mea cu. Et his ullum feugiat signiferumque, veri dolor no qui, nam
              equidem omittam ancillae cu. Propriae officiis at has, posse insolens has ne, simul blandit sed et. Ei
              nisl imperdiet sed. Ea nisl instructior disputationi per. Cu nam commodo disputationi, te cum dicit
              laoreet.
            </p>
          </div>
          
          <h2 style={styles.sectionHeader}>You might be interested in:</h2>
          <div>
            <h2 style={styles.sectionHeader}>Free Designs</h2>
            <p style={styles.body}>
              Lorem ipsum dolor sit amet, sea audiam imperdiet an.
            </p>
          </div>

          <div>
            <h2 style={styles.sectionHeader}>Ordering/Delivery</h2>
            <p style={styles.body}>
              Lorem ipsum dolor sit amet, sea audiam imperdiet an.
            </p>
          </div>

          <div>
            <h2 style={styles.sectionHeader}>Professionals</h2>
            <p style={styles.body}>
              Lorem ipsum dolor sit amet, sea audiam imperdiet an.
            </p>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default Faq;

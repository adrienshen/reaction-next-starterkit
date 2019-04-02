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
  body: {
    color: "#4E4E4E",
    fontFamily: "Lato, sans-serif",
    fontSize: "15px",
    marginBottom: "1rem",
  }
};

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
      authStore: { account }
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
          <ol style={{ padding: 0, marginBottom: "4rem" }}>
            <li style={styles.body}>Ensure accuracy. You’ll need a tape measure, straight edge and graph paper.</li>
            <li style={styles.body}>
              Measure clockwise. Record the overall length of each wall, working to your right around the room. Label
              walls, windows and doors with numbers.
            </li>
            <li style={styles.body}>
              Get the width and height. Take horizontal measurements of walls at 36-inch height. Record vertical
              measurements floor to windowsill, from windowsill to top of window, from top of window to ceiling, then
              from floor to ceiling.
            </li>
            <li style={styles.body}>
              Find your center. Indicate the centerline of all permanent features in all measurements including wall
              oven, range, sinks, windows, doors, closets, ducts and outlets.{" "}
            </li>
            <li style={styles.body}>
              Include the trim. When measuring doors and windows, the casing is considered part of the door or window.
              Measure from one side to the other of the door or window trim, then measure from the outside of the trim
              to the middle of the window or door.
            </li>
          </ol>

          <ol style={{ padding: 0, marginBottom: "4rem" }}>
            <li style={styles.body}>
              - Lighting - In addition to general lighting required by code, every work surface should be
              well-illuminated by appropriate task lighting.
            </li>

            <li style={styles.body}>
              - Cabinet Height - Plan to store frequently used items within easy reach. Base cabinets are normally 36
              inches high. Upper cabinets are normally 18 inches above the countertop and 30-42 inches high.
            </li>
            <li style={styles.body}>
              - Work Triangle - The distances between the three work centers—sink, cooktop, and refrigerator—form a work
              triangle. To maximize efficiency, the sum of the three distances should be no more than 26 feet.
            </li>
            <li style={styles.body}>
              - Fridge Landing Area - For easy handling of cold-storage items, include at least 15 inches of countertop
              landing area to one side of the refrigerator or within 48 inches of the refrigerator front.
            </li>
            <li style={styles.body}>
              - Sink Landing Area - For efficient prep and cleanup, include at least a 24-inch-wide countertop landing
              area on one side of the sink, and at least an 18-inch-wide landing area on the other side.
            </li>
            <li style={styles.body}>
              - Waste Receptacles - Include at least two waste receptacles—one near the sink and one for recycling,
              either in the kitchen or nearby.
            </li>
            <li style={styles.body}>
              - Dishwasher Placement - Locate the dishwasher within 36 inches of the sink. Provide at least 21 inches of
              standing space between the edge of the dishwasher and any countertops, appliances, and/or cabinets at a
              right angle to the dishwasher.
            </li>
            <li style={styles.body}>
              - Electrical Outlets - To prevent shock, GFCI protection is required on all outlets serving countertop
              surfaces within the kitchen. Electrical codes typically require one outlet for every two feet of
              countertop space. Local codes may vary.
            </li>
            <li style={styles.body}>
              - Oven Landing Area - Include at least a 15-inch landing area next to or above the oven for easy loading
              and unloading of items when baking.
            </li>
            <li style={styles.body}>
              - Work Aisle - The width of a work aisle should be at least 42 inches for one cook and at least 48 inches
              for multiple cooks.
            </li>
            <li style={styles.body}>
              - Cooking Surface Landing Area - Include a minimum of 12 inches of landing area on one side of a cooking
              surface and 15 inches on the other side.
            </li>
          </ol>
        </section>
      </Fragment>
    );
  }
}

export default Faq;

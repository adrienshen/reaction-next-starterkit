import React from "react";
import { withStyles } from "@material-ui/core/styles";
import RenderError from "./components/RenderError";

const styles = {
  renderTabsSection: {
    width: "100%"
  },
  buttons: {
    width: "100%",
    display: "flex"
  },
  buttonTabs: {
    width: "50%",
    border: "none",
    fontSize: "1rem",
    textTransform: "uppercase",
    outline: "none",
    paddingBottom: "1rem",
    background: "#fff",
    backgroundColor: "#fff"
  },
  contentContainer: {
    padding: "2rem 1rem",
    minHeight: "10rem"
  },
  content: {},
  features: {}
};

export default withStyles(styles, { name: "OCDetailTabs" })(({ classes, selectTab, tabSelected, product }) => {
  try {
    return (
      <section style={styles.renderTabsSection}>
        <div style={styles.buttons}>
          <button
            style={{
              ...styles.buttonTabs,
              borderBottom: tabSelected === "FEATURES" ? "4px solid #B09A51" : "none",
              color: tabSelected === "FEATURES" ? "#B09A51" : "#222"
            }}
            onClick={() => selectTab("FEATURES")}
          >
            Features
          </button>
          <button
            style={{
              ...styles.buttonTabs,
              borderBottom: tabSelected === "DETAILS" ? "4px solid #B09A51" : "none",
              color: tabSelected === "DETAILS" ? "#B09A51" : "#222"
            }}
            onClick={() => selectTab("DETAILS")}
          >
            Description
          </button>
        </div>
        <section style={styles.contentContainer}>
          {tabSelected === "DETAILS" ? <div style={styles.content}>{product.description}</div> : null}
          {tabSelected === "FEATURES" ? (
            <div className={[classes.content, classes.features]}>
              Features content - not sure where this should come from
            </div>
          ) : null}
        </section>
      </section>
    );
  } catch (err) {
    console.error("Error: ", err);
    return <RenderError />;
  }
});

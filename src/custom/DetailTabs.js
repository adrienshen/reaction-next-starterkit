import React from "react";
import { withStyles } from "@material-ui/core/styles";
import RenderError from "./components/RenderError";

const styles = themes => ({
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
    padding: "2rem 1rem"
  },
  content: {},
  features: {}
});

export default withStyles(styles, { name: "OCDetailTabs" })(({ classes, selectTab, tabSelected, product }) => {
  try {
    return (
      <section className={classes.renderTabsSection}>
        <div className={classes.buttons}>
          <button
            style={{
              borderBottom: tabSelected === "FEATURES" ? "4px solid #B09A51" : "none",
              color: tabSelected === "FEATURES" ? "#B09A51" : "#222"
            }}
            className={classes.buttonTabs}
            onClick={() => selectTab("FEATURES")}
          >
            Features
          </button>
          <button
            style={{
              borderBottom: tabSelected === "DETAILS" ? "4px solid #B09A51" : "none",
              color: tabSelected === "DETAILS" ? "#B09A51" : "#222"
            }}
            className={classes.buttonTabs}
            onClick={() => selectTab("DETAILS")}
          >
            Description
          </button>
        </div>
        <section className={classes.contentContainer}>
          {tabSelected === "DETAILS" ? <div className={classes.content}>{product.description}</div> : null}
          {tabSelected === "FEATURES" ? (
            <div className={[classes.content, classes.features]}>Features content</div>
          ) : null}
        </section>
        2
      </section>
    );
  } catch (err) {
    console.error("Error: ", err);
    return <RenderError />
  }
});

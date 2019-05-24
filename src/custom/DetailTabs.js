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

export default withStyles(styles, { name: "OCDetailTabs" })(({ classes, selectTab, tabSelected }) => {
  try {
    return (
      <section style={styles.renderTabsSection}>
        <div style={styles.buttons}>
          <button
            style={{
              ...styles.buttonTabs,
              borderBottom: tabSelected === "DETAILS" ? "4px solid #B09A51" : "none",
              color: tabSelected === "DETAILS" ? "#B09A51" : "#222"
            }}
            onClick={() => selectTab("DETAILS")}
          >
            DETAILS
          </button>
          <button
            style={{
              ...styles.buttonTabs,
              borderBottom: tabSelected === "FEATURES" ? "4px solid #B09A51" : "none",
              color: tabSelected === "FEATURES" ? "#B09A51" : "#222"
            }}
            onClick={() => selectTab("FEATURES")}
          >
            SPECIFICATIONS
          </button>
        </div>
        <section style={styles.contentContainer}>
          {tabSelected === "DETAILS" ? (
            <div style={styles.content}>
              <ProductDetailsTable />
            </div>
          ) : null}
          {tabSelected === "FEATURES" ? (
            <div className={[classes.content, classes.features]}>
              <Specifications />
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

const defaultTableDetails = [
  { key: "Style", value: "Shaker" },
  { key: "Face Frame", value: `3/4" x 1-3/4" Birch` },
  { key: "Door Frame", value: `Premium HDF` },
  { key: "Door Center", value: `Premium HDF` },
  { key: "Sides", value: `1/2" A-Grade Plywood` },
  { key: "Top & Bottom (Wall)", value: `1/2" A-Grade Plywood` },
  { key: "Bottom (Base)", value: `1/2" A-Grade Plywood` },
  { key: "Installation/Design Note", value: `Cabinet specs are subject...` }
];

const tableStyles = {
  border: "1px solid #aaa",
  padding: ".75rem",
  fontSize: ".8rem",
  color: "#444"
}

function ProductDetailsTable() {
  return (
    <div>
      <table style={{
        ...tableStyles,
        borderCollapse: "collapse",
        width: "100%"
      }}>
        <tbody>
          {defaultTableDetails.map((item, key) => {
            return (
              <tr key={key}>
                <td style={tableStyles}>{item.key}:</td>
                <td style={tableStyles}>{item.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Specifications() {
  return <div>
    <p>Specifications to be added</p>
  </div>
}

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import RenderError from "./RenderError";

const styles = theme => ({
  filterSelect: {
    width: "100%",
    height: "48px",
    border: "2px solid #ddd",
    paddingLeft: "2rem",
    background: "#fff",
    outline: "none"
  },
  button: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "2rem",
    border: "none",
    outline: "none",
    cursor: "pointer"
  },
  list: {
    listStyle: "none",
    display: "inline-flex",
    flexFlow: "row nowrap",
    width: "100%",
    justifyContent: "flex-end"
  }
});

@withStyles(styles, { name: "OCFilterColor" })
export default class FilterColor extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    const { classes, colorFilters, colorFilterSelected, selectDesignColor } = this.props;

    try {
      return (
        <section>
          <ul className={classes.list}>
            {colorFilters.map(pattern => {
              return (
                <li className={classes.colorPatternListItem}>
                  <button
                    onClick={() => selectDesignColor(pattern)}
                    className={classes.button}
                    style={{
                      backgroundImage: `url('${pattern.patternUrl}')`,
                      backgroundSize: "50px",
                      border: colorFilterSelected
                        ? colorFilterSelected.code === pattern.code
                          ? "2px solid #555"
                          : "none"
                        : "none"
                    }}
                  >
                    <span style={{ display: "none" }}>{pattern.patternLabel}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      );
    } catch (err) {
      return <RenderError />;
    }
  }
}

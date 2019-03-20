import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// const styles = theme => ({
//   colorPatternContainer: {},
//   colorPatternList: {},
//   colorPatternListItem: {},
//   colorPatternItem: {}
// });

// @withStyles(styles, { withTheme: true, name: "SkColorSelection" })
class ColorSelection extends Component {
  render() {
    const { classes } = props;
    const colors = [
      { patternLabel: "Soft White", patternUrl: "#fff" },
      { patternLabel: "Oak Wood", patternUrl: "/patterns/wood.png" },
      { patternLabel: "Red", patternUrl: "/patterns/red.png" },
      { patternLabel: "Brown", patternUrl: "/patterns/brown.png" },
      { patternLabel: "Dark", patternUrl: "/patterns/dark.png" }
    ];

    return <div>hello</div>
    // return (
    //   <section className={classes.colorPatternContainer}>
    //     <ul className={classes.colorPatternList}>
    //       <li className={classes.colorPatternListItem}>
    //         <button className={classes.colorPatternItem} onClick={() => alert("selected: ")} />
    //       </li>
    //     </ul>
    //   </section>
    // );
  }
}

export default ColorSelection;
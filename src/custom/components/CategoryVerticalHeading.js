import React from "react";
import colors from "../../lib/theme/colors";

export default function CategoryVerticalHeadings({ title }) {
  const styles = {
    section: {
      margin: "2rem auto",
      marginBottom: "2rem",
      borderBottom: "1px solid #ddd",
      width: "80%",
    },
    h1: {
      color: colors.GOLD,
      fontFamily: "Lato, sans-serif",
      fontSize: "1.5rem",
      fontWeight: 200,
      margin: "1rem",
      marginLeft: "0rem"
    },
    hr: {
      color: "#BBB"
    }
  }

  return <section style={styles.section}>
    <h1 style={styles.h1}>{title}</h1>
  </section>
}

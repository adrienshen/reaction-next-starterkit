import React from "react";

const badgeSharedStyles = {
  display: "inline-block",
  padding: ".5rem 1rem",
  fontFamily: "Lato",
  color: "#fff",
  background: "#4E4E4E",
  borderRadius: ".5rem",
};

export function PendingBadge() {
  return <span style={{
    ...badgeSharedStyles
    }}
  >
    Pending
  </span>
}

export function CompletedBadge() {
  return <span style={{
    ...badgeSharedStyles
    }}
  >
    <span><DoubleCheckSVG />Completed</span>
  </span>
}

function DoubleCheckSVG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="a" d="M0,0H24V24H0Z"/><path class="b" d="M18,7,16.59,5.59l-6.34,6.34,1.41,1.41Zm4.24-1.41L11.66,16.17,7.48,12,6.07,13.41,11.66,19l12-12ZM.41,13.41,6,19l1.41-1.41L1.83,12Z"/></svg>
  )
}

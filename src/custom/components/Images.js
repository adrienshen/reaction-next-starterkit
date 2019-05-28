import React from "react";

export const ProductVariantThumbnail = ({ src }) => {
  return (
    <div style={{}}>
      <img width="120px" height="120px" style={{}} src={src || "https://via.placeholder.com/120x120"}
        alt="" />
    </div>
  );
};

export const SampleCenterImage = ({ src }) => {
  return (
    <img
      style={{
        width: "200px",
        marginBottom: ".75rem"
      }}
      src={src || "/static/images/samples/placeholder.png" || "https://via.placeholder.com/200x200"}
      alt=""
    />
  );
};

/**
 * Test changes
 */

export const WishListImage = ({ src }) => {
  return (
    <div>
      <img
        style={{
          width: "100%",
          maxWidth: "450px",
          marginBottom: ".75rem",
          maxHeight: "280px"
        }}
        src={src || "/static/images/samples/placeholder.png" || "https://via.placeholder.com/200x200"}
        alt=""
      />
    </div>
  );
};

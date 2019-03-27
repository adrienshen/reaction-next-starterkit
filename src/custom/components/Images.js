import React from "react";

export const ProductVariantThumbnail = ({ src }) => {
  return (
    <div style={{}}>
      <img style={{}} src={src || "https://via.placeholder.com/100x120"} alt="a product image" />
    </div>
  );
};

export const SampleCenterImage = ({ src }) => {
  return (
    <img style={{
      width: "200px",
      marginBottom: ".75rem",
    }} src={src || "/static/images/samples/placeholder.png" || "https://via.placeholder.com/200x200"} alt="a sample image" />
  );
}

export const WishListImage = ({ src }) => {
  return (
    <img style={{
      width: "100%",
      maxWidth: "450px",
      marginBottom: ".75rem",
      maxHeight: "280px"
    }} src={src || "/static/images/samples/placeholder.png" || "https://via.placeholder.com/200x200"} alt="a sample image" />
  );
}

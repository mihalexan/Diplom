import React from "react";

export default function ProductItem({
  title,
  id,
  image,
  price,
  discont_price,
}) {
  return (
    <div>
      <p>{title}</p>
    </div>
  );
}

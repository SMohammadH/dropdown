import React from "react";

const CategoryIcon = ({ iconDec }: { iconDec: number }) => {
  return <p>{String.fromCodePoint(iconDec)}</p>;
};

export default CategoryIcon;

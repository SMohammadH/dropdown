"use client";

import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { categories } from "@/app/data/categories";
import { DropdownType } from "@/app/types/dropdownType";

const CategoryDropdown = () => {
  const [selectedItems, setSelectedItems] = useState<DropdownType[]>([]);

  const handleItemClick = (item: DropdownType) => {
    let newSelectedItems: DropdownType[];
    if (selectedItems.includes(item)) {
      newSelectedItems = selectedItems.filter((i) => i !== item);
    } else {
      newSelectedItems = [...selectedItems, item];
    }
    setSelectedItems(newSelectedItems);
  };

  return (
    <Dropdown
      items={categories}
      selectedItems={selectedItems}
      handleItemClick={handleItemClick}
    />
  );
};

export default CategoryDropdown;

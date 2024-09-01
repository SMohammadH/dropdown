"use client";

import React, { useState, useRef } from "react";
import styles from "./Dropdown.module.scss";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import CategoryIcon from "./components/CategoryIcon";
import Image from "next/image";
import clsx from "clsx";
import { DropdownType } from "@/app/types/dropdownType";

type DropdownProps = {
  items: DropdownType[];
  selectedItems: DropdownType[];
  handleItemClick: (arg0: DropdownType) => void;
};

const Dropdown = ({ items, handleItemClick, selectedItems }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const closeDropdown = () => setIsOpen(false);

  useClickOutside(dropdownRef, closeDropdown);

  return (
    <div className={styles.multiSelectDropdown} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={clsx(styles.dropdownToggle, { [styles.active]: isOpen })}
      >
        {selectedItems.length > 0
          ? selectedItems.map((item) => item.value).join(", ")
          : "Select..."}
        <Image
          src={isOpen ? "/icons/chevron-up.svg" : "/icons/chevron-down.svg"}
          width={20}
          height={20}
          alt="arrow"
        />
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {items.map((option) => (
            <li
              key={option.id}
              className={
                selectedItems.includes(option) ? styles.checked : undefined
              }
            >
              <label>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(option)}
                  onChange={() => handleItemClick(option)}
                />
                <p>
                  {option.label}{" "}
                  {option.iconDec && <CategoryIcon iconDec={option.iconDec} />}
                </p>
                <Image
                  src="/icons/check.svg"
                  width={22}
                  height={22}
                  alt="check"
                />
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

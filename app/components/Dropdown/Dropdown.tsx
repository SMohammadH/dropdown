"use client";

import React, { useState, useRef, useEffect } from "react";
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
  addItem: (arg0: DropdownType) => void;
};

const Dropdown = ({
  items,
  handleItemClick,
  selectedItems,
  addItem,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [filteredItems, setFilteredItems] = useState<DropdownType[]>([]);

  useEffect(() => {
    if (inputValue.length > 0) {
      setFilteredItems(
        items.filter((item) =>
          item.value.includes(inputValue.toLocaleLowerCase())
        )
      );
    } else {
      setFilteredItems(items);
    }
  }, [inputValue, items]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const closeDropdown = () => setIsOpen(false);

  useClickOutside(dropdownRef, closeDropdown);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addItem({
        id: items[items.length - 1]?.id + 1,
        label: inputValue.charAt(0).toUpperCase() + inputValue.slice(1),
        value: inputValue,
      });
      setInputValue("");
    }
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          className={clsx(styles.dropdownInput, { [styles.active]: isOpen })}
          placeholder={
            selectedItems.length > 0
              ? selectedItems.map((item) => item.value).join(", ")
              : "Enter..."
          }
        />
        <Image
          src={isOpen ? "/icons/chevron-up.svg" : "/icons/chevron-down.svg"}
          width={18}
          height={18}
          alt="chevron"
          className={styles.chevronIcon}
        />
      </div>

      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {filteredItems.map((option) => (
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
                <div>
                  {option.label}{" "}
                  {option.iconDec && <CategoryIcon iconDec={option.iconDec} />}
                </div>
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

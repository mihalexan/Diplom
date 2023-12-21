import React from "react";
import s from "./sortingDiscount.module.css";



const SortingDiscount = ({ onChange, checked }) => {
    const handleClick = () => {
        if (onChange) {
          onChange(!checked);
        }
      };
    

  return (
    <div className={s.discountItem_container}>
    <h3 className={s.discount}>Discount Item</h3>
    <div
      className={`${s.customCheckbox} ${checked ? s.checked : ""}`}
      onClick={onChange}
    >
      {checked && <span className={s.checkIcon}>✓</span>}
    </div>
    </div>
  );
};


export default SortingDiscount;

import React from "react";
import { useDispatch } from "react-redux";
import s from "./sortingDiscount.module.css";
import { toggleDiscount } from "../../store/slices/filtersSlice";

const SortingDiscount = ({ checked }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleDiscount());
  };

  return (
    <div className={s.discountItem_container}>
      <h3 className={s.discount}>Discount Item</h3>
      <div
        className={`${s.customCheckbox} ${checked ? s.checked : ""}`}
        onClick={handleClick}
      >
        {checked && <span className={s.checkIcon}>✓</span>}
      </div>
    </div>
  );
};

export default SortingDiscount;

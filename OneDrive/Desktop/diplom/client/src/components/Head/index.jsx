import React from "react";
import { animateScroll as scroll } from "react-scroll";
import s from "./head.module.css";

export const Head = ({ scrollToCategories }) => {
  const handleClick = () => {
    if (scrollToCategories) {
      scrollToCategories();
    }
  };

  return (
    <div className={s.top}>
      <div className={s.container}>
        <h1 className={s.text}>Amazing Discounts on Garden Products!</h1>
        <button className={s.btn} onClick={handleClick}>
          Check out
        </button>
      </div>
    </div>
  );
};

export default Head;

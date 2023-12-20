import React from "react";
import s from "./CustomCheckbox.module.css"; // Подставьте свой путь к стилям

const CustomCheckbox = ({ onChange, checked }) => {
  return (
    <div
      className={`${s.customCheckbox} ${checked ? s.checked : ""}`}
      onClick={onChange}
    >
      {checked && <span className={s.checkIcon}>✓</span>}
    </div>
  );
};

export default CustomCheckbox;

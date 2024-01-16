import { useDispatch } from "react-redux";
import { useState } from "react";
import s from "../FilterForms.module.css";
import { discountProducts } from "../../../store/slices/allProductsSlice";

function SaleForm() {
  const dispatch = useDispatch();

  const [checkBox, setCheckBox] = useState(false);
  const changeState = () => {
    setCheckBox((prev) => !prev);
    dispatch(discountProducts(!checkBox));
  };

  return (
    <div className={s.discountedItems}>
      <h5 className={s.discount}>Discounted items</h5>
      <div
        className={`${s.inputContainer} ${checkBox ? s.checked : ""}`}
        onClick={changeState}
      >
        <div className={`${s.checkbox} ${checkBox ? s.checked : ""}`}>
          {checkBox && <span className={s.checkmark}>✓</span>}
        </div>
      </div>
    </div>
  );
}

export default SaleForm;

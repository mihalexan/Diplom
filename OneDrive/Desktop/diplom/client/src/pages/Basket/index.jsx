import React from "react";
import Cart from "../../components/Cart";
import s from "./basket.module.css";

const Basket = () => {
  return (
    <div>
      <div className={s.head_cart}>
        <h1 className={s.h1}>Shopping cart</h1>
        <div className={s.line}></div>
        <button className={s.back}>Back to the store</button>
      </div>

      <Cart />
    </div>
  );
};

export default Basket;

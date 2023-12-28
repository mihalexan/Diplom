import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../CartItem";
import s from "./cart.module.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart.list);
  const totalSum = cart
    .reduce((acc, el) => acc + el.price * el.count, 0)
    .toFixed(2);

  return (
    <div className={s.mainCart}>
      <div className={s.productsCart}>
        {cart.map((el) => (
          <CartItem key={el.id} {...el} />
        ))}
      </div>

      <div className={s.orderMenu}>
        <h3 className={s.orderH3}>Order details</h3>
        <div className={s.infoOrder}>
          <p className={s.pCart}>
            3 items <br /> Total
          </p>
          <h3 className={s.orderH2}>{`$${totalSum ? totalSum : ""}`}</h3>
        </div>

        <div className={s.inputsOrdersBox}>
          <input className={s.inputsOrders} type="text" placeholder="Name" />
          <input
            className={s.inputsOrders}
            type="text"
            placeholder="Phone number"
          />
          <input className={s.inputsOrders} type="text" placeholder="Email" />
        </div>
        <button className={s.btnOrder}>Order</button>
      </div>
    </div>
  );
};

export default Cart;

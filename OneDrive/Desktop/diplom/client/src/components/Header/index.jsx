import React from "react";
import style from "./header.module.css";
import logo from "../../assets/logo.svg";
import basket from "../../assets/basket(empty).svg";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

export const Header = () => {
  const totalItemsInCart = useSelector((state) => state.cart.totalItems);

  return (
    <>
      <div className={`${style.container} ${style.header}`}>
        <Link to="/">
          <img className={`${style.logo} ${style.item}`} src={logo} alt="log" />
        </Link>
        <div className={`${style.navMenu} ${style.item}`}>
          <Link to="/">Main Page</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/all_products">All products</Link>
          <Link to="/all_sales">All sales</Link>
        </div>
        <Link to="/basket">
          <div className={style.cartIndicatorContainer}>
            <img
              className={`${style.basket} ${style.item}`}
              src={basket}
              alt="basket"
            ></img>
            {totalItemsInCart > 0 && (
              <div className={style.cartIndicator}>{totalItemsInCart}</div>
            )}
          </div>
        </Link>
      </div>
      <div className={style.headerLine} />
    </>
  );
};

export default Header;

//я добавила класс .item для каждого элемента внутри .header для обеспечения единообразия в стилях.

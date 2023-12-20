import React from "react";
import s from "./allsales.module.css";
import { Link } from "react-router-dom";
import Discounts from "../../components/Discounts";

export const AllSales = () => {
  return (
    <>
      <div className={s.container}>
        <div className={s.buttons}>
          <Link to="/">
            <button className={s.btn1}>Main Page</button>
          </Link>
          <div className={s.line} />
          <button className={s.btn2}>All sales</button>
        </div>
        <h1>All sales</h1>
        <Discounts />
      </div>
    </>
  );
};

export default AllSales;

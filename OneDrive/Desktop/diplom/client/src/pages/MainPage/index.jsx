import React, { useEffect } from "react";
import style from "./mainpage.module.css";
import Head from "../../components/Head";
import Footer from "../../components/Footer";
import Sale from "../../components/Sale";

import { Form, Link } from "react-router-dom";
import CategoriesItem from "../../components/CategoriesItem";
import FormItem from "../../components/FormItem";

export const MainPage = () => {
  const scrollToCategories = () => {
    const categoriesElement = document.getElementById("categoriesSection");
    if (categoriesElement) {
      categoriesElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div>
      <Head scrollToCategories={scrollToCategories} />

      <div id="categoriesSection" className={style.container_categories}>
        <h1 className={style.title}> Categories</h1>
        <div className={style.line}></div>
        <Link to="/Categories">
          <button className={style.all_categories}>All categories</button>
        </Link>
      </div>

      <CategoriesItem />
      <FormItem />

      <div id="categoriesSection" className={style.container_categories}>
        <h1 className={style.title}>Sale</h1>
        <div className={style.line}></div>
        <Link to="/all_sales">
          <button className={style.all_categories}>All sales</button>
        </Link>
      </div>
      <Sale />
      <Footer />
    </div>
  );
};

export default MainPage;

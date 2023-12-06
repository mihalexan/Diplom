import React from "react";
import s from "./style.module.css";
import image from "../../assets/404-Page.svg";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

const NotFound = () => {
  return (
    <div className={s.page}>
      <img className={s.img} src={image} alt="img" />
      <p className={s.text}>
        Oops! The page you're looking for does not exist.
      </p>
      <Link to="/" className={s.home_btn}>
        Go Home
      </Link>
      <Footer />
    </div>
  );
};

export default NotFound;

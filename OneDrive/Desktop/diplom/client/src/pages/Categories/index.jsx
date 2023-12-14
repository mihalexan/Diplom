import s from "./categories.module.css";
import CategoriesItem from "../../components/CategoriesItem";
import { Link } from "react-router-dom";

export const Categories = () => {
  return (
    <>
      <div className={s.container}>
        <div className={s.buttons}>
          <Link to="/">
            <button className={s.btn1}>Main Page</button>
          </Link>
          <div className={s.line} />
          <button className={s.btn2}>Categories</button>
        </div>
        <h1>Categories</h1>
      </div>
      <CategoriesItem />
    </>
  );
};

export default Categories;

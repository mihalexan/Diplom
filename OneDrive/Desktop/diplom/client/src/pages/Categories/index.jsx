import Footer from "../../components/Footer";
import s from "./categories.module.css";
import CategoriesItem from "../../components/CategoriesItem";
import { Title } from "@mui/icons-material";

export const Categories = () => {
  return (
    <>
      <div className={s.container}>
        <button>Main Page</button>
        <button>Categories</button>

        <h1>Categories</h1>
      </div>
      <CategoriesItem />
    </>
  );
};

export default Categories;

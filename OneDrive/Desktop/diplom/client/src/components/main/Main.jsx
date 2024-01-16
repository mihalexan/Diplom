import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import s from "./Main.module.css";
import CategoryList from "./components/categories/CategoryList";
import { useDispatch } from "react-redux";
import { getAllCategories } from "../../store/slices/categoriesSlice";
import { getAllProducts } from "../../store/slices/allProductsSlice";
import GetDiscount from "./components/getDiscount/GetDiscount";
import SaleProductsList from "./components/sale/SaleProductsList";

function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <main className={s.mainContainer}>
      <section className={s.top}>
        <h2 className={s.title}>Amazing Discounts on Garden Products!</h2>
        <button
          className={s.btnCheckOut}
          onClick={() => {
            navigate("/sales");
          }}
        >
          Check out
        </button>
      </section>
      <CategoryList />
      <GetDiscount />
      <SaleProductsList />
    </main>
  );
}
export default Main;

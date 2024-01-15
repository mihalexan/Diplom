import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../store/slices/allProductsSlice";
import s from "./Products.module.css";
import FilterForm from "../FiltersForms/FilterForm/FilterForm";
import SaleForm from "../FiltersForms/SaleForm/SaleForm";
import SortForm from "../FiltersForms/SortForm/SortForm";
import ProductCard from "./ProductCard";
function Products() {
  const products = useSelector((state) => state.products.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <main className={s.productsMain}>
      <div className={s.navWrapper}>
        <Link className={s.links} to="/">
          Main page
        </Link>
        <div className={s.greyLine}></div>
        <Link id={s.currentLink} to="/products">
          All products
        </Link>
      </div>
      <h4 className={s.title}>All products</h4>
      <div style={{ display: "flex", marginBottom: "50px" }}>
        <FilterForm />
        <SaleForm />
        <SortForm />
      </div>
      <ul className={s.productWrapper}>
        {products.map((product) => {
          return <ProductCard key={product.id} {...product} />;
        })}
      </ul>
    </main>
  );
}
export default Products;

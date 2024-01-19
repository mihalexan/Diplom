import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../store/slices/allProductsSlice";
import s from "../products/Products.module.css";
import ProductCard from "../products/ProductCard";
import SortForm from "../FiltersForms/SortForm/SortForm";
import FilterForm from "../FiltersForms/FilterForm/FilterForm";

function Sales() {
  const products = useSelector((state) => state.products.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const discountedItems =
    products && products.filter((product) => product.discont_price);

  return (
    <main className={s.productsMain}>
      <div className={s.navWrapper}>
        <Link className={s.links} to="/">
          Main page
        </Link>
        <div className={s.greyLine}></div>
        <Link id={s.currentLink} to="/sales">
          All sales
        </Link>
      </div>
      <h4 className={s.title}>Discounted items</h4>
      <div style={{ display: "flex", marginBottom: "50px" }}>
        <FilterForm />
        <SortForm />
      </div>
      <ul className={s.productWrapper}>
        {discountedItems
          ?.filter((el) => el.showProduct && el.showProductFilter)
          .map((discountedItem) => {
            return <ProductCard key={discountedItem.id} {...discountedItem} />;
          })}
      </ul>
    </main>
  );
}
export default Sales;

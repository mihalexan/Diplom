import s from "./ProductsByCategory.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsOfCategory } from "../../../store/slices/productsByCategorySlice";
import FilterForm from "../../FiltersForms/FilterForm/FilterForm";
import SaleForm from "../../FiltersForms/SaleForm/SaleForm";
import SortForm from "../../FiltersForms/SortForm/SortForm";
import ProductCard from "../ProductCard/ProductCard";

function ProductsByCategory() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsOfCategory());
  }, [dispatch]);

  let { productsOfCategory } = useSelector((state) => state.productsOfCategory);

  if (!productsOfCategory || !productsOfCategory.data) {
    return <div>Loading...</div>;
  }

  let categoryProducts = productsOfCategory.data;
  return (
    <main className={s.productsMain}>
      <div className={s.navWrapper}>
        <Link className={s.links} to="/">
          Main page
        </Link>
        <div className={s.line}></div>
        <Link className={s.links} to="/categories">
          Categories
        </Link>
        <div className={s.line}></div>
        <Link id={s.activeLink}>{productsOfCategory.category.title}</Link>
      </div>
      <h4 className={s.title}>{productsOfCategory.category.title}</h4>
      <div style={{ display: "flex", marginBottom: "50px" }}>
        <FilterForm />
        <SaleForm />
        <SortForm arrayOfProducts={categoryProducts} />
      </div>
      <ul className={s.productWrapper}>
        {categoryProducts.map((product) => {
          return (
            <ProductCard
              key={product.id}
              {...product}
              categorytitle={categoryProducts.title}
            />
          );
        })}
      </ul>
    </main>
  );
}
export default ProductsByCategory;

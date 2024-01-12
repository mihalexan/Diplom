import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../store/slices/allProductsSlice";
import classes from "./Products.module.css";
import { Sorting } from "./components/Sorting";
import ProductCard from "./ProductCard";
function Products() {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <main className={classes.productsMain}>
      <div className={classes.navWrapper}>
        <Link className={classes.links} to="/">
          Main page
        </Link>
        <div className={classes.greyLine}></div>
        <Link id={classes.currentLink} to="/products">
          All products
        </Link>
      </div>
      <h4 className={classes.title}>All products</h4>
      <Sorting />
      <ul className={classes.productWrapper}>
        {products.map((product) => {
          return <ProductCard key={product.id} {...product} />;
        })}
      </ul>
    </main>
  );
}
export default Products;

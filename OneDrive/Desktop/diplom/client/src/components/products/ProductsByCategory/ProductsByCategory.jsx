import s from "./ProductsByCategory.module.css";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsOfCategory } from "../../../store/slices/productsByCategorySlice";
import FilterForm from "../../FiltersForms/FilterForm/FilterForm";
import SaleForm from "../../FiltersForms/SaleForm/SaleForm";
import SortForm from "../../FiltersForms/SortForm/SortForm";
import ProductCard from "../ProductCard/ProductCard";

function ProductsByCategory() {
  const { id } = useParams(); // Извлекаем id из URL
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(id);
    if (id) {
      dispatch(fetchProductsOfCategory({ id }));
    }
  }, [id, dispatch]);

  const productsOfCategory = useSelector(
    (state) => state.productsOfCategory.productsByCategory
  );
  const { data, category } = productsOfCategory;
  console.log("Products of Category:", data);
  console.log("Category:", category);

  //if (!productsOfCategory || !productsOfCategory.data) {
  //  return <div>Loading...</div>;
  // }

  // let categoryProducts = productsOfCategory.data;
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
        {category && <Link id={s.activeLink}>{category.title}</Link>}
      </div>
      {category && <h4 className={s.title}>{category.title}</h4>}
      <div style={{ display: "flex", marginBottom: "50px" }}>
        <FilterForm />
        <SaleForm />
        <SortForm arrayOfProducts={data} />
      </div>
      <ul className={s.productWrapper}>
        {data
          ?.filter((el) => el.showProduct && el.showProductFilter)
          .map((product) => {
            return (
              <ProductCard
                key={product.id}
                {...product}
                categorytitle={category.title}
              />
            );
          })}
      </ul>
    </main>
  );
}
export default ProductsByCategory;

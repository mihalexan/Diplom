import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../../requests/productsByCategoryRequest";
import ProductItem from "../../components/ProductItem";

export default function ProductsCategories() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      await dispatch(getProductsByCategory(id));
    };
    fetchCategories();
  }, []);

  const productsByCategory = useSelector(
    (state) => state.productsByCategory?.list
  );
  console.log(productsByCategory);

  const productData = productsByCategory?.data;
  console.log("products", productData);
  return (
    <div>
      {productData ? (
        productData.map((el) => <ProductItem key={el.id} {...el} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

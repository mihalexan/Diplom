import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../requests/allProductsRequest";
import { addToCard } from "../../store/slices/cartSlice";
import {
  selectProducts,
  selectProductsStatus,
} from "../../store/slices/allProductsSlice";
import s from "./sorting.module.css";
import CustomCheckbox from "../FilterContainer/CustomCheckbox";
import FilterContainer from "../FilterContainer";

const Sorting = () => {
  const [addedProductIds, setAddedProductIds] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Загрузка данных с сервера при монтировании компонента
    dispatch(getAllProducts());
  }, [dispatch]);

  const products = useSelector(selectProducts);
  const productsStatus = useSelector(selectProductsStatus);

  const handleAddToCart = (productId) => {
    setAddedProductIds([...addedProductIds, productId]);
  };

  const isProductAdded = (productId) => addedProductIds.includes(productId);

  const baseImageUrl = "http://localhost:3333";

  return (
    <div className={s.container_sort}>
      <FilterContainer showCheckbox={true}>
        {({ products: filteredAndSortedData }) => (
          <div className={s.img_container}>
            {filteredAndSortedData.map((product) => (
              <div className={s.product_content} key={product.id}>
                <div className="buttonInside">
                  <img
                    style={{
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    className={s.img_all}
                    src={`${baseImageUrl}${product.image}`}
                    alt={product.name}
                  />

                  <button
                    className={isProductAdded(product.id) ? "added active" : ""}
                    onClick={() => dispatch(addToCard(product))}
                    disabled={isProductAdded(product.id)}
                  >
                    {isProductAdded(product.id) ? "Added" : "Add to Cart"}
                  </button>
                </div>

                <p className={s.product_title}>
                  {product.title && product.title.length <= 28
                    ? product.title
                    : (product.title && product.title.slice(0, 18) + "...") ||
                      ""}
                </p>

                {product.discont_price && (
                  <p className={s.saleDiscount}> {product.discont_price}%</p>
                )}

                {product.discont_price ? (
                  <div className={s.priceInfo}>
                    <span className={s.discountedPrice}>
                      $
                      {(
                        product.price -
                        (product.price * product.discont_price) / 100
                      ).toFixed(2)}
                    </span>
                    <span className={s.initialPrice}>${product.price}</span>
                  </div>
                ) : (
                  <div className={s.priceInfo}>
                    <span className={s.noDiscount}>${product.price}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        ;
      </FilterContainer>
    </div>
  );
};
export default Sorting;

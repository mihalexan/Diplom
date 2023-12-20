import React, { useEffect, useState } from "react";
import s from "./discount.module.css";
import { useDispatch } from "react-redux";
import { addToCard } from "../../store/slices/cartSlice";
import { getAllDiscountedProducts } from "../../requests/saleRequests";
import FilterContainer from "../FilterContainer";

const Discounts = () => {
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [addedProductIds, setAddedProductIds] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Загрузка данных с сервера при монтировании компонента
    dispatch(getAllDiscountedProducts());
  }, [dispatch]);

  const handleMouseEnter = (productId) => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const handleAddToCart = (productId) => {
    setAddedProductIds([...addedProductIds, productId]);
  };

  const isProductAdded = (productId) => addedProductIds.includes(productId);

  return (
    <div className={s.container_sort}>
      <FilterContainer showCheckbox={false}>
        {({ products }) => (
          <div className={s.img_container}>
            {products.map((product) => (
              <div
                key={product.id}
                className={`${s.product_content} ${
                  hoveredProductId === product.id ? s.hovered : ""
                }`}
                onMouseEnter={() => handleMouseEnter(product.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="buttonInside">
                  <img
                    style={{
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    className={s.img_all}
                    src={`http://localhost:3333${product.image}`}
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
      </FilterContainer>
    </div>
  );
};

export default Discounts;

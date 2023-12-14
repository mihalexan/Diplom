import React, { useEffect, useState } from "react";
import s from "./sorting.module.css";

const CustomCheckbox = ({ onChange, checked }) => {
  return (
    <div
      className={`${s.customCheckbox} ${checked ? s.checked : ""}`}
      onClick={onChange}
    >
      {checked && <span className={s.checkIcon}>✓</span>}
    </div>
  );
};

const Sorting = () => {
  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");
  const [products, setProducts] = useState([]);

  const [sortOption, setSortOption] = useState("default");
  const [originalOrder, setOriginalOrder] = useState([]);

  const [showDiscountedOnly, setShowDiscountedOnly] = useState(false);

  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [addedProductIds, setAddedProductIds] = useState([]);

  useEffect(() => {
    // Загрузка данных с сервера при монтировании компонента
    fetch("http://localhost:3333/products/all")
      .then((response) => response.json())
      .then((data) => {
        setProducts([...data]);
        setOriginalOrder([...data]);
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, []); // Пустой массив зависимостей гарантирует, что запрос будет выполнен только один раз при монтировании

  const filteredProducts = products.filter((product) => {
    const productPrice = parseFloat(product.price);
    const from = parseFloat(fromPrice);
    const to = parseFloat(toPrice);

    if (showDiscountedOnly && !product.discont_price) {
      return false; // Покажем только товары со скидками
    }

    if (!isNaN(from) && !isNaN(to)) {
      return productPrice >= from && productPrice <= to;
    }
    return true;
  });

  const handleToggleDiscount = () => {
    setShowDiscountedOnly(!showDiscountedOnly);
  };

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

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const getSortedProducts = () => {
    const source = showDiscountedOnly ? [...filteredProducts] : [...products];

    switch (sortOption) {
      case "newest":
        return [...source].sort((a, b) => new Date(b.date) - new Date(a.date));
      case "price-high-low":
        return [...source].sort((a, b) => b.price - a.price);
      case "price-low-high":
        return [...source].sort((a, b) => a.price - b.price);
      default:
        return [...source];
    }
  };

  const sortedProducts = getSortedProducts();

  const baseImageUrl = "http://localhost:3333";

  return (
    <div className={s.container_sort}>
      <div className={s.sort_by_price}>
        <h3 className={s.h3}>Price</h3>
        <label>
          <input
            className={s.from}
            placeholder="from"
            type="number"
            value={fromPrice}
            onChange={(e) => setFromPrice(e.target.value)}
          />
        </label>
        <label>
          <input
            className={s.to}
            placeholder="to"
            type="number"
            value={toPrice}
            onChange={(e) => setToPrice(e.target.value)}
          />
        </label>

        <div className={s.discounted_items}>
          <h3 className={s.discountTitle}>Discounted Items</h3>
          <CustomCheckbox
            checked={showDiscountedOnly}
            onChange={handleToggleDiscount}
          />
        </div>

        <div className={s.sorted}>
          <label className={s.sortLabel}>
            Sorted
            <select value={sortOption} onChange={handleSortChange}>
              <option value="default">By Default</option>
              <option value="newest">Newest</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="price-low-high">Price: Low to High</option>
            </select>
          </label>
        </div>
      </div>

      <div className={s.img_container}>
        {sortedProducts.map((product) => (
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
                onClick={() => handleAddToCart(product.id)}
                disabled={isProductAdded(product.id)}
              >
                {isProductAdded(product.id) ? "Added" : "Add to Cart"}
              </button>
            </div>

            <p className={s.product_title}>
              {product.title && product.title.length <= 28
                ? product.title
                : (product.title && product.title.slice(0, 18) + "...") || ""}
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
        ;
      </div>
    </div>
  );
};

export default Sorting;

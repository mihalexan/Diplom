import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../requests/allProductsRequest";
import CustomCheckbox from "./CustomCheckbox";
import { selectProducts } from "../../store/slices/allProductsSlice";

const FilterContainer = ({ initialData, showCheckbox, children }) => {
  const dispatch = useDispatch();

  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [showDiscountedOnly, setShowDiscountedOnly] = useState(false);

  // Здесь можете добавить useEffect для загрузки данных с сервера
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Здесь можете добавить логику для фильтрации и сортировки данных

  const handleToggleDiscount = () => {
    setShowDiscountedOnly(!showDiscountedOnly);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Логика фильтрации и сортировки
  const products = useSelector(selectProducts);
  let filteredAndSortedData = [...products];

  // Пример фильтрации по скидке
  if (showDiscountedOnly) {
    filteredAndSortedData = filteredAndSortedData.filter(
      (product) => product.discont_price
    );
  }

  // Пример сортировки по цене
  if (sortOption === "price-high-low") {
    filteredAndSortedData.sort((a, b) => b.price - a.price);
  } else if (sortOption === "price-low-high") {
    filteredAndSortedData.sort((a, b) => a.price - b.price);
  }

  return (
    <div>
      <div>
        {/* Добавьте сюда поля для фильтрации (цена, скидка, сортировка и т.д.) */}
        <input
          type="number"
          placeholder="from"
          value={fromPrice}
          onChange={(e) => setFromPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="to"
          value={toPrice}
          onChange={(e) => setToPrice(e.target.value)}
        />

        {showCheckbox && (
          <div>
            <h3>Discounted Items</h3>
            <CustomCheckbox
              checked={showDiscountedOnly}
              onChange={handleToggleDiscount}
            />
          </div>
        )}

        <div>
          <h3>Sorted</h3>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="default">By Default</option>
            <option value="newest">Newest</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="price-low-high">Price: Low to High</option>
          </select>
        </div>
      </div>

      {typeof children === "function" &&
        children({ products: filteredAndSortedData })}
    </div>
  );
};

export default FilterContainer;

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from "react-redux";
import { getAllProducts } from "../../requests/allProductsRequest";
import { addToCard } from "../../store/slices/cartSlice";
import s from "./productsContainer.module.css";
import PriceFilter from '../PriceFilter';
import SortingDiscount from '../SortingDiscount';
import { setPriceFilter, toggleDiscount } from '../../store/slices/filtersSlice';

const ProductsContainer = ({ showDiscountedOnly }) => {
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [addedProductIds, setAddedProductIds] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const dispatch = useDispatch();
  const allData = useSelector((state) => state.sale.list);
  const isDiscountedOnly  = useSelector((state) => state.filters.showDiscountedOnly);

  const productsToShow = showDiscountedOnly ? allData.filter((el) => el.discont_price) : allData;

    const handleFilterChange = (newFilterParams) => {
    const filtered = productsToShow.filter((product) => {
      const price = (
        product.price -
        (product.price * product.discont_price) / 100
      ).toFixed(2);

   //    Если поля пустые, отображаем все товары
     if (!newFilterParams.from && !newFilterParams.to) {
        return true;
      }

      return (
        (!newFilterParams.from || price >= newFilterParams.from) &&
        (!newFilterParams.to || price <= newFilterParams.to)
      );
    });
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    // Загрузка данных с сервера при монтировании компонента
    dispatch(getAllProducts());
    // Применение начального состояния фильтрации
    dispatch(setPriceFilter({ fromPrice: '', toPrice: '' }));
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

  const handleToggleDiscount = () => {
    // Диспетчер Redux для изменения showDiscountedOnly
    dispatch(toggleDiscount());
  };

  const isProductAdded = (productId) => addedProductIds.includes(productId);

  return (
    <div>
    <PriceFilter  onFilterChange={handleFilterChange}/>
    <div className={s.customCheckboxContainer}>
          {/* Рендерим компонент SortingDiscount только на странице "All Products" */}
          {window.location.pathname.includes('/all_products') && (
            <SortingDiscount onChange={handleToggleDiscount} checked={isDiscountedOnly} />
          )}
        </div>
    <div className={s.container_sort}>
          <div className={s.img_container}>
            {filteredProducts.map((product) => (
              <div key={product.id}
              className={`${s.product_content} ${
                hoveredProductId === product.id ? s.hovered : ""
              }`}
              onMouseEnter={() => handleMouseEnter(product.id)}
              onMouseLeave={handleMouseLeave}>
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
    </div>
    </div>
  )
}

export default ProductsContainer;

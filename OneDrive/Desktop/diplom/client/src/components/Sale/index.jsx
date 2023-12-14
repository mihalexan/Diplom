import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../requests/saleRequests";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./styles.css";
import { Pagination } from "swiper/modules";

export default function Sale() {
  const dispatch = useDispatch();
  const saleData = useSelector((state) => state.sale.list);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [addedProductIds, setAddedProductIds] = useState([]);

  const fourArray = saleData.filter((el) => el.discont_price);

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
    <div className="swiper-container">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {fourArray.map((el) => (
          <SwiperSlide key={el.id}>
            <div
              className={`swiper-slide-content-sale ${
                hoveredProductId === el.id ? "hovered" : ""
              } ${isProductAdded(el.id) ? "added" : ""}`}
              onMouseEnter={() => handleMouseEnter(el.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="buttonInside">
                <img
                  style={{
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                  src={`http://localhost:3333${el.image}`}
                  alt={el.title}
                />

                {hoveredProductId === el.id && (
                  <button
                    className={isProductAdded(el.id) ? "added active" : ""}
                    onClick={() => handleAddToCart(el.id)}
                    disabled={isProductAdded(el.id)}
                  >
                    {isProductAdded(el.id) ? "Added" : "Add to Cart"}
                  </button>
                )}
              </div>

              <div className="productInfo">
                {el.discont_price && (
                  <span className="saleDiscount">-{el.discont_price}%</span>
                )}
              </div>

              <h3 className="h3Cards">
                {el.title.length <= 28
                  ? el.title
                  : el.title.slice(0, 15) + "..."}
              </h3>

              <div className="priceInfo">
                <span className="discountedPrice">
                  ${(el.price - (el.price * el.discont_price) / 100).toFixed(2)}
                </span>
                <span className="initialPrice">${el.price}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

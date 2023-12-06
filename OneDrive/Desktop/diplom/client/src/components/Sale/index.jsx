import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination } from "swiper/modules";

export default function Sale() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/products/all");
        if (!response.ok) {
          throw new Error("Ошибка сети");
        }
        const result = await response.json();
        setData(result); // API возвращает массив данных
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
    fetchData();
  }, []); // эффект запускается один раз при монтировании компонента

  // Функция для вычисления процента скидки
  const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
    return ((originalPrice - discountedPrice) / originalPrice) * 100;
  };

  // Отфильтровать продукты с скидкой и проверить наличие свойства discount
  const discountedProducts = data.filter(
    (product) => product.discount && product.discount > 0
  );

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
        {discountedProducts.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-slide-content">
              <img
                src={`http://localhost:3333${item.image}`}
                alt={item.title}
              />
              <p>{item.title}</p>
              <p>Цена: {item.price}</p>
              {item.discount && <p>Скидка: {item.discount}%</p>}
              {item.discount && (
                <p>
                  Процент скидки:{" "}
                  {calculateDiscountPercentage(
                    item.price,
                    item.price - item.discount_price
                  )}
                  %
                </p>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

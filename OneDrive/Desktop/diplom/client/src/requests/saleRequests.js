import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    try {
      const response = await fetch("http://localhost:3333/products/all");
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching products:", error.message);
      throw error;
    }
  }
);

export const getAllDiscountedProducts = createAsyncThunk(
  "products/getAllDiscountedProducts",
  async () => {
    try {
      const response = await fetch("http://localhost:3333/products/all");
      const data = await response.json();

      // Фильтрация товаров со скидкой
      const discountedProducts = data.filter(
        (product) => product.discont_price
      );

      return discountedProducts;
    } catch (error) {
      console.error("Ошибка при получении товаров:", error.message);
      throw error;
    }
  }
);

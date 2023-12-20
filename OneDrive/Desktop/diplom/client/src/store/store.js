import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice";
import saleReducer from "./slices/saleSlice";
import cartReducer from "./slices/cartSlice";
import productsByCategoryReducer from "./slices/productsByCategory";
import allProductsReducer from "./slices/allProductsSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    sale: saleReducer,
    cart: cartReducer,
    productsByCategory: productsByCategoryReducer,
    allProducts: allProductsReducer,
  },
});

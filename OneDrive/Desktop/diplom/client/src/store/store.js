import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice";
import saleReducer from "./slices/saleSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    sale: saleReducer,
  },
});

// productsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../../requests/allProductsRequest";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

const allProductsSlice = createSlice({
  name: "allProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectProducts = (state) => state.allProducts.products;
export const selectProductsStatus = (state) => state.allProducts.status;

export default allProductsSlice.reducer;

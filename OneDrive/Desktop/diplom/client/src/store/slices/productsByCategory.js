import { createSlice } from "@reduxjs/toolkit";
import { getProductsByCategory } from "../../requests/productsByCategoryRequest";

const ProductsByCategory = createSlice({
  name: "productsByCategory",
  initialState: {
    status: null,
    list: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.status = "ready";

        state.list = action.payload;
      })
      .addCase(getProductsByCategory.rejected, (state) => {
        state.status = "error ";
      });
  },
});

export default ProductsByCategory.reducer;

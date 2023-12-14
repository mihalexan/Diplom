import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../../requests/saleRequests";

const saleSlice = createSlice({
  name: "sale",
  initialState: {
    status: null,
    list: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "ready";
        state.list = action.payload;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default saleSlice.reducer;

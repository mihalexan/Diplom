import { createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "../../requests/categoriesRequest";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    status: null,
    list: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = "ready";
        console.log(action.payload);
        state.list = action.payload;
      })
      .addCase(getAllCategories.rejected, (state) => {
        state.status = "error ";
      });
  },
});

export default categoriesSlice.reducer;

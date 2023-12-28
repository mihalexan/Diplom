import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    priceFilter: {
      fromPrice: "",
      toPrice: "",
    },
    showDiscountedOnly: false, // Начальное значение для флага showDiscountedOnly
    sortOption: "default",
  },
  reducers: {
    setPriceFilter: (state, action) => {
      state.priceFilter = { ...state.priceFilter, ...action.payload };
    },
    toggleDiscount: (state) => {
      state.showDiscountedOnly = !state.showDiscountedOnly;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
  },
});

export const { setPriceFilter, toggleDiscount, setSortOption } =
  filtersSlice.actions;

export default filtersSlice.reducer;

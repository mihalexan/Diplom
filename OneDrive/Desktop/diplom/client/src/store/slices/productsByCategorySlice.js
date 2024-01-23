import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loading from "../../assets/images/loading.svg";

const initialState = {
  list: {
    data: [],
    status: null,
    error: null,
  },
};

export const fetchProductsOfCategory = createAsyncThunk(
  "productsOfCategory/getProductsOfCategory",
  async ({ id }, { rejectWithValue }) => {
    try {
      let response = await fetch(`http://localhost:3333/categories/${id}`);
      if (!response.ok) {
        throw new Error("HTTP-Error");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const productsByCategorySlice = createSlice({
  name: "productsOfCategory",
  initialState: {
    status: null,
    products: {
      category: {
        title: "",
      },
      data: [],
    },
    error: null,
  },
  reducers: {
    sortProducts(state, action) {
      if (action.payload === "low-high") {
        state.list.sort((a, b) => a.price - b.price);
      } else if (action.payload === "high-low") {
        state.list.sort((a, b) => b.price - a.price);
      } else if (action.payload === "titleAsc") {
        state.list.sort((a, b) => a.title.localeCompare(b.title));
      } else if (action.payload === "titleDesc") {
        state.list.sort((a, b) => b.title.localeCompare(a.title));
      } else {
        state.list.sort((a, b) => a.id - b.id);
      }
    },

    filterPrice(state, action) {
      const { minPrice, maxPrice } = action.payload;
      state.list.map((el) => {
        let actualPrice = el.discont_price || el.price;
        if (actualPrice >= minPrice && actualPrice <= maxPrice) {
          el.showProductFilter = true;
        } else {
          el.showProductFilter = false;
        }
        return el;
      });
    },

    discountProducts(state, action) {
      if (action.payload) {
        state.list.map((el) => {
          if (el.discont_price === null) {
            el.showProduct = false;
          }
          return el;
        });
      } else {
        state.list.map((el) => {
          el.showProduct = true;
          return el;
        });
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsOfCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductsOfCategory.fulfilled, (state, action) => {
        state.status = "ready";
        state.list = action.payload;
        const { data, category } = action.payload;
        state.list.data = data.map((el) => ({
          ...el,
          showProduct: true,
          showProductFilter: true,
        }));
        state.list.category = category;
      })
      .addCase(fetchProductsOfCategory.rejected, (state, action) => {
        state.status = "error ";
      });
  },
});
export const { filterPrice, sortProducts, discountProducts } =
  productsByCategorySlice.actions;
export default productsByCategorySlice.reducer;

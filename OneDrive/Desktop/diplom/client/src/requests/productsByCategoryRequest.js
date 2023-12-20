import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProductsByCategory = createAsyncThunk(
  "productsByCategory/getProductsByCategory",
  async (categoryId) => {
    try {
      const response = await fetch(
        `http://localhost:3333/categories/${categoryId}`
      );
      const data = await response.json();

      return data;
    } catch (error) {
      console.log("Error! Can't get products by category");
      throw error;
    }
  }
);

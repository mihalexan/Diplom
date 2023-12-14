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

import { createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "http://localhost:3333";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    const url = `${API_BASE_URL}/products/all`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Something went wrong");
    }
  }
);

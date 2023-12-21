const baseURL = "http://localhost:3333"; 

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${baseURL}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
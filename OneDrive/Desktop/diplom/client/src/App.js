import React, { useEffect } from "react";
import "../src/App.css";
import { Routes, Route, useParams } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import Categories from "./pages/Categories";
import AllProducts from "./pages/AllProducts";
import AllSales from "./pages/AllSales";
import Basket from "./pages/Basket";
import NotFound from "./pages/NotFound";
import CategoriesItem from "./components/CategoriesItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "./requests/categoriesRequest";
import Footer from "./components/Footer";
import ProductsCategories from "./pages/ProductsCategories";

function App() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.list);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/all_products" element={<AllProducts />} />
        <Route path="/all_sales" element={<AllSales />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/categories/:id" element={<ProductsCategories />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

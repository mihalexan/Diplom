import React from "react";
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

function Annuals() {
  let { categoryId } = useParams();
}

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/categories" element={<Categories />}>
          <Route path="all" element={<CategoriesItem />} />

          <Route path="annuals" element={<Annuals />} />
          <Route path="nursery" element={<CategoriesItem />} />
          <Route
            path="garden_art"
            element={<CategoriesItem categoryId={3} />}
          />
          <Route
            path="plant_care"
            element={<CategoriesItem categoryId={4} />}
          />
          <Route path="seasonal" element={<CategoriesItem categoryId={5} />} />
        </Route>
        <Route path="/all_products" element={<AllProducts />} />
        <Route path="/all_sales" element={<AllSales />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

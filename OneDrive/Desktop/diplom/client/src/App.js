import "../src/App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header/Header";
import Main from "./components/main/Main";
import Basket from "./components/basket/Basket";
import Sales from "./components/sales/Sales";
import Footer from "./layout/Footer/Footer";
import Categories from "./components/categories/Categories";
import Products from "./components/products/Products";
import ProductsByCategories from "./components/products/components/ProductsByCategories";
import SingleProduct from "./components/products/SingleProduct";
import NotFound from "./components/notFound/notFound";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/products" element={<Products />} />
        <Route path="categories/:id" element={<ProductsByCategories />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

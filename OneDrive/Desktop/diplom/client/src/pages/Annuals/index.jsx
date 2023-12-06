import React from "react";
import Footer from "../../components/Footer";

export const Annuals = ({ categoryId }) => {
  return (
    <div>
      <h1>Annuals Page</h1>
      <p>Category ID: {categoryId}</p>
      <Footer />
    </div>
  );
};

export default Annuals;

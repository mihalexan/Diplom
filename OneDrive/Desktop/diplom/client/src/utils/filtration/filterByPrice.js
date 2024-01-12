function filterByPrice(products, min, max) {
  const filtredProducts = products.filter((product) => {
    if (product.discont_price) {
      return product.discont_price >= min && product.discont_price <= max;
    } else return product.price >= min && product.price <= max;
  });
  return filtredProducts;
}

export default filterByPrice;

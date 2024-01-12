function deleteFromCart(id) {
  let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
  let index = productsInCart.map((prod) => prod.id).indexOf(id);
  if (index !== -1) {
    productsInCart.splice(index, 1);
  }
  localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
}
export default deleteFromCart;

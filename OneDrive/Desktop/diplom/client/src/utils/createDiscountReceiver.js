let discountReceiver = {};
function createDiscountReceiver({ name, phone, email }) {
  const id = Math.floor(Math.random() * 999);
  discountReceiver = { ...{ id, name, phone, email } };
  return discountReceiver;
}
export { createDiscountReceiver, discountReceiver };

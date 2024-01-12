import s from "../products/components/Sorting.module.css";
import filterByPrice from "../../utils/filtration/filterByPrice";
let filtredProducts;
function SaleSorting({ arrayOfProducts }) {
  function changeHandlerFrom(e) {
    filtredProducts = filterByPrice(arrayOfProducts, e.target.value, Infinity);
    console.log("filtred products from ", filtredProducts);
  }
  function changeHandlerTo(e) {
    filtredProducts = filterByPrice(filtredProducts, 0, e.target.value);
    console.log("filtred products to ", filtredProducts);
  }

  return (
    <div className={s.setupBar}>
      <div className={s.priceSetup}>
        <h5>Price</h5>
        <input placeholder="from" onBlur={(e) => changeHandlerFrom(e)} />
        <input placeholder="to" onBlur={(e) => changeHandlerTo(e)} />
      </div>
      <div className={s.sortSetup}>
        <h5>Sorted</h5>
        <select>
          <option value="default">by default</option>
          <option value="alphabet">alphabet</option>
          <option value="asc">price: high-low</option>
          <option value="desc">price: low-high</option>
        </select>
      </div>
    </div>
  );
}
export { SaleSorting, filtredProducts };

import s from "./Products.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSingleProduct } from "../../store/slices/singlProductSlice";
import { addToCart } from "../../store/slices/basketSlice";

function ProductCard(product) {
  const url = "http://localhost:3333";
  const discountValue = Math.floor(
    100 - (product.discont_price * 100) / product.price
  );
  const dispatch = useDispatch();
  function goToSingleProduct() {
    dispatch(fetchSingleProduct({ id: product.id }));
  }
  const addHandler = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <li className={s.productCard} key={product.id}>
      <Link to={`/products/${product.id}`}>
        <img
          src={!product.id ? product.image : url + product.image}
          className={s.productImg}
          onClick={() => goToSingleProduct(product.id)}
        />
      </Link>
      <div className={s.productDescription}>
        <Link to={`/products/${product.id}`}>
          <span
            className={s.productTitle}
            onClick={() => goToSingleProduct(product.id)}
          >
            {product.title}
          </span>
        </Link>
        <div className={s.priceWrapper}>
          <p className={s.discountPrice}>
            ${product.discont_price || product.price}
          </p>
          {product.discont_price ? (
            <p className={s.price}>${product.price}</p>
          ) : null}
        </div>
        {product.discont_price ? (
          <p className={s.discount}>-{discountValue}%</p>
        ) : null}
      </div>
      <button className={s.addToCartBtn} onClick={() => addHandler(product)}>
        Add to cart
      </button>
    </li>
  );
}
export default ProductCard;

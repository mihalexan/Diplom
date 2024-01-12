import s from "./Basket.module.css";
import closeIcon from "../../assets/images/basket/xWhite.svg";

function ModalWindow({ close }) {
  return (
    <div className={s.modalWindowWrapper}>
      <div className={s.modalWindow}>
        <div className={s.message}>
          <h5>Congratulations!</h5>
          <h6>
            Your order has been successfully placed on the website.
            <br />
            <br />
            A manager will contact you shortly to confirm your order.
          </h6>
        </div>
        <img src={closeIcon} alt="X" onClick={() => close()} />
      </div>
    </div>
  );
}
export default ModalWindow;

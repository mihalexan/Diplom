import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  nameValidation,
  phoneValidation,
  emailValidation,
} from "../../../../utils/validations";
import s from "./GetDiscount.module.css";
import getDiscountFoto from "../../../../assets/images/main/getDiscountFoto.svg";
import { createDiscountReceiver } from "../../../../utils/createDiscountReceiver";
import { postDiscount } from "../../../../store/slices/getDiscountSlice";

function GetDiscount() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });
  function getDiscount(data) {
    createDiscountReceiver(data);
    dispatch(postDiscount());
    reset();
  }

  return (
    <section className={s.getDiscount}>
      <h4>5% off on the first order</h4>
      <div className={s.sectionWrrapper}>
        <img src={getDiscountFoto} />
        <form onSubmit={handleSubmit(getDiscount)} className={s.formWrapper}>
          <input
            type="text"
            placeholder="Name"
            {...register("name", nameValidation)}
          />
          {errors.name && (
            <p style={{ color: "#02393e" }}>{errors.name.message}</p>
          )}
          <input
            type="text"
            placeholder="Phone Number"
            {...register("phone", phoneValidation)}
          />
          {errors.phone && (
            <p style={{ color: "#02393e" }}>{errors.phone.message}</p>
          )}
          <input
            type="text"
            placeholder="Email"
            {...register("email", emailValidation)}
          />
          {errors.email && (
            <p style={{ color: "#02393e" }}>{errors.email.message}</p>
          )}
          <button type="submit">Get a discount</button>
        </form>
      </div>
    </section>
  );
}
export default GetDiscount;

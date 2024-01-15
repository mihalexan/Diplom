import { useDispatch } from "react-redux";
import { useState } from "react";
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
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  const handleClick = () => {
    // Обработка клика на кнопку
    setIsButtonClicked(true);
    // Остальной код...
  };

  const getDiscount = async (data) => {
    setSubmitStatus("submitting");
    try {
      await createDiscountReceiver(data);
      await dispatch(postDiscount());
      setSubmitStatus("request submit");
      reset();
    } catch (error) {
      console.error("Error submitting discount request:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <section className={`${s.getDiscount} ${isButtonClicked ? s.clicked : ""}`}>
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
            <p
              style={{
                color: "var(--green, #393)",
                fontSize: "1.2em",
                textAlign: "center",
              }}
            >
              {errors.name.message}
            </p>
          )}
          <input
            type="text"
            placeholder="Phone Number"
            {...register("phone", phoneValidation)}
          />
          {errors.phone && (
            <p
              style={{
                color: "var(--green, #393)",
                fontSize: "1.2em",
                textAlign: "center",
              }}
            >
              {errors.phone.message}
            </p>
          )}
          <input
            type="text"
            placeholder="Email"
            {...register("email", emailValidation)}
          />
          {errors.email && (
            <p
              style={{
                color: "var(--green, #393)",
                fontSize: "1.2em",
                textAlign: "center",
              }}
            >
              {errors.email.message}
            </p>
          )}
          <button
            type="submit"
            onClick={handleClick}
            className={`${s.discountButton} ${
              isButtonClicked ? s.clicked : ""
            }`}
          >
            Get a discount
          </button>
          {submitStatus && (
            <p
              style={{
                color: "var(--green, #393)",
                fontSize: "1.2em",
                textAlign: "center",
              }}
            >
              {submitStatus}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
export default GetDiscount;

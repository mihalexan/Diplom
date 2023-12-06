import React, { useState } from "react";
import s from "./form.module.css";
import img from "../../assets/order.svg";
import { Title } from "@mui/icons-material";

const FormItem = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка на заполненность полей
    if (!formData.name || !formData.phoneNumber || !formData.email) {
      setError("All fields are required");
      return;
    }

    // Обработка отправки данных
    try {
      const response = await fetch("http://localhost:3333/sale/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error submitting form");
      }

      // Сброс ошибки и данных формы
      setError("");
      setFormData({ name: "", phoneNumber: "", email: "" });

      // Вызов колбэка onSubmit, если передан
      if (onSubmit) {
        onSubmit(formData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className={s.formContainer}>
      <h1 className={s.title}>5% off on the first order</h1>
      <div className={s.content}>
        <div className={s.foto}>
          <img src={img} />
        </div>
        <div className={s.form}>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                autoComplete="on"
              />
            </label>
            <label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                autoComplete="on"
              />
            </label>
            <label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                autoComplete="on"
              />
            </label>
            <button type="submit">Get a Discount</button>
            {error && (
              <p className={s.errorMessage} style={{ color: "red" }}>
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormItem;

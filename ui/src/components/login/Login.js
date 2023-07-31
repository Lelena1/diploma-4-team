import React, { useState } from "react";
import Form from "../form/Form";
import useFormValidation from "../../utils/hooks/useFormValidation";

function Login({ handleAuthorization }) {
  const [input, setInput] = useState("");
  const { values, handleChange, errors, isValid } = useFormValidation();

  function handleChangeInput(e) {
    handleChange(e);
    if (input.length > 0) {
      setInput("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault(); //Запрещаем браузеру переходить по адресу формы

    handleAuthorization({
      //Передаём значения управляемых компонентов во внешний обработчик
      username: values.username,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone
    });
  }

  return (
    <Form
      header="Рады видеть!"
      onSubmit={handleSubmit}
      path="/profile"
      btn="Войти"
      link="/sign-up"
      linkTitle="Создать аккаунт"
      errors={!isValid}
    >
      <>
        <label className="form__label">
          <h2 className="form__description">Логин</h2>
          <input
            required
            name="username"
            value={values.username || ""}
            type="email"
            minLength="4"
            maxLength="32"
            autoComplete="on"
            className="form__email form__input"
            onChange={handleChangeInput}
          />
          <div
            className={`input-hidden ${errors.username ? "input-error" : ""}`}
          >
            {errors.username}
          </div>
        </label>
        <label className="form__label">
          <h2 className="form__description">Пароль</h2>
          <input
            required
            value={values.password || ""}
            name="password"
            type="password"
            minLength="8"
            maxLength="16"
            autoComplete="on"
            className="form__password form__input"
            onChange={handleChangeInput}
          />
          <div
            className={`input-hidden ${errors.password ? "input-error" : ""}`}
          >
            {errors.password}
          </div>
        </label>
      </>
    </Form>
  );
}

export default Login;

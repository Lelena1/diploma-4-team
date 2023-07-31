import React, { useState } from "react";
import Form from "../form/Form";
import useFormValidation from "../../utils/hooks/useFormValidation";

function Registration({ handleRegistration }) {
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

    handleRegistration({
      //Передаём значения управляемых компонентов во внешний обработчик
      username: values.username,
      password: values.password,
      role: values.role,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone
    });
  }

  return (
    <Form
      header="Добро пожаловать!"
      onSubmit={handleSubmit}
      path="/sign-in"
      btn="Зарегистрироваться"
      text="Уже зарегистрированы?"
      link="/sign-in"
      linkTitle="Войти"
      errors={!isValid}
    >
      <>
        <label className="form__label">
          <h2 className="form__description">Логин (email) пользователя</h2>
          <input
            required
            value={values.username || ""}
            title="username"
            name="username"
            type="email"
            minLength="4"
            maxLength="32"
            placeholder="Длина логина от 4 до 32 символов"
            className="form__input"
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
            placeholder="Длина пароля от 8 до 16 символов"
            className="form__password form__input"
            onChange={handleChangeInput}
          />
          <div
            className={`input-hidden ${errors.password ? "input-error" : ""}`}
          >
            {errors.password}
          </div>
        </label>
        {<label className="form__label">
          <h2 className="form__description">Роль</h2>
          <select
              required
              value={values.role || ""}
              title="Роль"
              name="role"
              className="form__input"
              onChange={handleChangeInput}
          >
            <option value="" selected disabled hidden>Выберите роль</option>
            <option value="USER">Пользователь</option>
            <option value="ADMIN">Администратор</option>
          </select>
          <div className={`input-hidden ${errors.role ? "input-error" : ""}`}>
            {errors.role}
          </div>
        </label>}
        <label className="form__label">
          <h2 className="form__description">Имя</h2>
          <input
            required
            value={values.firstName || ""}
            title="Имя"
            name="firstName"
            type="text"
            minLength="2"
            maxLength="16"
            placeholder="Длина имени от 2 до 16 символов"
            className="form__input"
            onChange={handleChangeInput}
          />
          <div
            className={`input-hidden ${errors.firstName ? "input-error" : ""}`}
          >
            {errors.firstName}
          </div>
        </label>
        <label className="form__label">
          <h2 className="form__description">Фамилия</h2>
          <input
            required
            value={values.lastName || ""}
            title="Фамилия"
            name="lastName"
            type="text"
            minLength="2"
            maxLength="16"
            placeholder="Длина фамилии от 2 до 16 символов"
            className="form__input"
            onChange={handleChangeInput}
          />
          <div
            className={`input-hidden ${errors.lastName ? "input-error" : ""}`}
          >
            {errors.lastName}
          </div>
        </label>
        <label className="form__label">
          <h2 className="form__description">Телефон</h2>
          <input
            required
            value={values.phone || ""}
            title="Телефон"
            type="tel"
            name="phone"
            pattern="\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}"
            placeholder="+7(___)___-__-__"
            className="form__input"
            onChange={handleChangeInput}
          />
          <div className={`input-hidden ${errors.phone ? "input-error" : ""}`}>
            {errors.phone}
          </div>
        </label>
      </>
    </Form>
  );
}

export default Registration;

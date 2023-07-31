import React, { useState, useEffect } from "react";
import UserForm from "../userForm/UserForm";
import useFormValidation from "../../utils/hooks/useFormValidation";
import Modal from "../Modal/Modal";

function Profile({ userInfo, handleUpdateUser, handleUpdatePassword }) {
  const [input, setInput] = useState("");
  const [isDisplayModal, setDisplayModal] = useState(false);
  const { values, handleChange, errors, isValid, setValues } =
    useFormValidation();

  const handleClickOpen = () => {
    setDisplayModal(true);
  };

  const handleClickClose = () => {
    setDisplayModal(false);
  };

  function handleChangeInput(e) {
    handleChange(e);
    if (input.length > 0) {
      setInput("");
    }
  }

  function handleUpdate(e) {
    e.preventDefault();
    handleUpdateUser({
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
    });
  }

  useEffect(() => {
    setValues(userInfo);
  }, [userInfo, setValues]);

  return (
    <>
    <Modal
      isVisible={isDisplayModal}
      closeModal={handleClickClose}
      updatePassword={handleUpdatePassword}
    />
    <UserForm
      title="Привет,"
      userName={userInfo.firstName}
      onSubmit={handleUpdate}
      buttonText="Сохранить"
      errors={!isValid}
      disabled={!isValid}
    >
      <label className="userForm__label-profile">
        <h2 className="userForm__subtitle">Имя</h2>
        <input
          value={values.firstName || ""}
          title="Имя"
          name="firstName"
          type="text"
          minLength="2"
          maxLength="16"
          required
          autoComplete="on"
          className="userForm__input"
          onChange={handleChangeInput}
        />
        <div
          className={`input-hidden ${errors.firstName ? "input-error" : ""}`}
        >
          {errors.firstName}
        </div>
      </label>
      <label className="userForm__label-profile">
        <h2 className="userForm__subtitle">Фамилия</h2>
        <input
          value={values.lastName || ""}
          title="Фамилия"
          name="lastName"
          type="text"
          required
          minLength="2"
          maxLength="16"
          autoComplete="on"
          className="userForm__input"
          onChange={handleChangeInput}
        />
        <div className={`input-hidden ${errors.lastName ? "input-error" : ""}`}>
          {errors.lastName}
        </div>
      </label>
      <label className="userForm__label-profile">
        <h2 className="userForm__subtitle">Телефон</h2>
        <input
          value={values.phone || ""}
          title="Телефон"
          type="tel"
          name="phone"
          required
          pattern="\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}"
          autoComplete="on"
          className="userForm__input"
          onChange={handleChangeInput}
        />
        <div className={`input-hidden ${errors.phone ? "input-error" : ""}`}>
          {errors.phone}
        </div>
      </label>
    </UserForm>
    <button className={"button-link button-link__text"} onClick={handleClickOpen}>Сменить пароль</button>
    </>
  );
}

export default Profile;

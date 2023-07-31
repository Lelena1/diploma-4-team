import React, { useState } from "react";
import UserForm from "../userForm/UserForm";
import useFormValidation from "../../utils/hooks/useFormValidation";

function EditCommentPopup({
  isOpen,
  onClose,
  commentText,
  id,
  handleEdit,
}) {
  const [input, setInput] = useState("");
  const { values, handleChange, errors, isValid } = useFormValidation();
  function handleChangeInput(e) {
    handleChange(e);
    if (input.length > 0) {
      setInput("");
    }
  }
  
  function onEditComment(e) {
    e.preventDefault();
    handleEdit({
      text: values.text,
    });
    onClose();
   //  плохо тк, перезагрузит страницу раньше чем будет отправлен запрос на update
    // то есть прервет запрос на бэк
    // window.location.reload();
  }

  return (
    <div
      className={`popup ${
        isOpen // тут работаем с конкретным компонентом не с массивом по этому открываем только его(управляет parent)
          ? "popup_is-opened"
          : ""
      }`}
    >
      <div className="popup__container-comment">
        <button
          onClick={onClose}
          className="close-button close-button_form"
        ></button>
        <UserForm
          id={id}
          onSubmit={onEditComment}
          title="Изменить"
          buttonText="Изменить"
          errors={!isValid}
          disabled={!isValid}
        >
          <label className="userForm__label userForm__label-comment">
            <h2 className="userForm__subtitle">Комментарий</h2>
            <input
              className="userForm__input"
              required
              value={values.text || ""}
              placeholder={commentText}
              title="Название"
              name="text"
              type="text"
              minLength="8"
              maxLength="64"
              onChange={handleChangeInput}
            />
            <div
              className={`input-hidden ${
                errors.text ? "input-error" : ""
              }`}
            >
              {errors.text}
            </div>
          </label>
        </UserForm>
      </div>
    </div>
  );
}
export default EditCommentPopup;

import React, { useState } from "react";
import useFormValidation from "../../utils/hooks/useFormValidation";

function CommentForm({ addComment }) {
  const [text, setText] = useState("");
  const { values, handleChange, errors, isValid } = useFormValidation();

  function handleChangeInput(e) {
    handleChange(e);
    if (text.length > 0) {
      setText("");
    }
  }

  function handleAddComment(e) {
    e.preventDefault();
    addComment({
      text: values.text,
    });
  }

  return (
    <form className="comment__form" onSubmit={handleAddComment}>
      <label className="comment-label">
        <h2 className="comment__form-title">Оставьте комментарий</h2>
        <input
          value={values.text}
          name="text"
          className="comment__input"
          minLength="8"
          maxLength="64"
          required
          onChange={handleChangeInput}
        />
        <div className={`input-hidden ${errors.text ? "input-error" : ""}`}>
          {errors.text}
        </div>
      </label>
      <button
        className={`comment__button comment__button-text ${
          !isValid ? "comment__button_disabled" : ""
        }`}
        disabled={!isValid}
        type="submit"
      >
        Отправить
      </button>
      <div className="input-error input-hidden"></div>
    </form>
  );
}

export default CommentForm;

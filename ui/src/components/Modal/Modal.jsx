import './style.css';
import React, {useState} from 'react';

const Modal = ( { isVisible, closeModal, updatePassword}) => {
    const [password, setPassword] = useState('');

    const handleChange = event => {
        setPassword(event.target.value);
    };

    const handleClick = event => {
        event.preventDefault();
        updatePassword(password)
    };

    return isVisible ? (
        <div className="wrapper">
            <div className="container-enter">
                <div className="modal__block">
                    <form className="modal__form-password" id="formPassword" action="ui/src/components/Modal/Modal#">
                        <div className="modal__logo">
                            <h2>Сменить пароль</h2>
                        </div>
                        <input className="modal__input password" type="password" minLength="8" maxLength="16" name="password" value={password} onChange={handleChange} id="formpassword" placeholder="Введите новый пароль" />
                        <button className="modal__btn-enter" id="btnEnter" onClick={handleClick}><span>Сменить пароль</span></button>
                        <button className="modal__btn-signup" id="btnSignUp" onClick={closeModal}><span>Отмена</span></button>
                    </form>
                </div>
            </div>
        </div>
    ) : null;
};

export default Modal;

import React  from "react";
import MediaQuery from "react-responsive";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Button from "../button/Button";

function Header({ onOpen, isAuthorized, signOut }) {
  //console.log('Header', isAuthorized);
  let location = useLocation().pathname;
  return (
    <header className="header">
      {location === "/sign-up" ? (
        <Link className="link" to="/">
          <img className="header__img" src={'/src/images/tear-off-ads.png'} alt="asd icon" />
        </Link>
      ) : location === "/sign-in" ? (
        <Link className="link" to="/">
          <img className="header__img" src={'/src/images/tear-off-ads.png'} alt="asd icon" />
        </Link>
      ) : location === "/sign-in/email" ? (
        <Link className="link" to="/">
          <img className="header__img" src={'/src/images/tear-off-ads.png'} alt="asd icon" />
        </Link>
      ) : location === "/sign-in/email/newpassword" ? (
        <img className="header__img" src={'/src/images/tear-off-ads.png'} alt="asd icon" />
      ) : isAuthorized ? (
        <>
          <img className="header__img" src={'/src/images/tear-off-ads.png'} alt="asd icon" />
          <MediaQuery minWidth={1000}>
            <Button
              logOut={signOut}
              text="Выйти"
              className="button-link button-link__text"
              user={isAuthorized}
            />
          </MediaQuery>
          <MediaQuery maxWidth={999}>
            <img
              className="header__sandwich"
              src={'/src/images/sandwich__icon.png'}
              alt="sandwich icon"
              onClick={onOpen}
            />
          </MediaQuery>
        </>
      ) : (
        <>
          <Link className="link" to="/" >
            <img className="header__img" src={'/src/images/tear-off-ads.png'} alt="asd icon" />
          </Link>
          <Link className="link" to="/sign-in">
            <Button
              login={isAuthorized}
              text="Войти"
              className="button-link button-link__text"
            />
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;

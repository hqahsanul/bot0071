import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  Switch,
  Redirect,
  useRoutes,
  Link,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faHeart,
  faComment,
  faRotateLeft,
  faXmark,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [click, setclick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setclick(!click);
  const closeMobileMenu = () => setclick(false);

  const showButton = () => {
    if (window.innerWidth <= 500) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener("resize", showButton);

  return (
    <>
      <div class={click ? "header active" : "header "}>
        <a href="" class={click ? "logo-inactive" : "logo"}>
          CompanyLogo
        </a>

        <div className="header-menu-bar" onClick={handleClick}>
          <FontAwesomeIcon icon={click ? faXmark : faBars} />
        </div>

      </div>
    </>
  );
}

export default Header;

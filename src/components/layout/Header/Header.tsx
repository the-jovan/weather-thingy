import { FunctionComponent } from "react";
import classes from "./header.module.scss";
import { Link } from "react-router-dom";

import logo from "../../../assets/images/logo.svg";

const Header: FunctionComponent = () => {
  return (
    <header className={classes.header}>
      <Link to="/">
        <img src={logo} alt="WeatherStation logo" />
      </Link>
    </header>
  );
};

export default Header;

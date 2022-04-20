import { FunctionComponent } from "react";
import classes from "./button.module.scss";

const Button: FunctionComponent<{
  type: string;
  text: any;
  customClass?: string;
  clickFn: any;
}> = ({ type, text, customClass, clickFn }) => {
  return (
    <button
      onClick={clickFn}
      className={`${classes.button} ${classes[type]}${
        customClass ? ` ${customClass}` : ""
      }`}
    >
      {text}
    </button>
  );
};

export default Button;

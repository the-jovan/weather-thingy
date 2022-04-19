import { FunctionComponent } from "react";
import classes from "./button.module.scss";

const Button: FunctionComponent<{
  type: string;
  text: any;
  customClass?: string;
}> = ({ type, text, customClass }) => {
  return (
    <button
      className={`${classes.button} ${classes[type]}${
        customClass ? ` ${customClass}` : ""
      }`}
    >
      {text}
    </button>
  );
};

export default Button;

import { FunctionComponent, memo } from "react";
import classes from "./button.module.scss";

const Button: FunctionComponent<{
  type: string;
  text: any;
  customClass?: string;
  clickFn?: () => void;
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

export default memo(Button);

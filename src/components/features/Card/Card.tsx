import { FunctionComponent } from "react";
import Button from "../../ui/Button/Button";
import classes from "./card.module.scss";

const Card: FunctionComponent = () => {
  return (
    <div className={classes.wrapper}>
      <h2>City</h2>
      <p>State</p>
      <p>33c</p>
      <Button type="regular" text="View City" />
    </div>
  );
};

export default Card;

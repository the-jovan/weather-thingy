import { FunctionComponent } from "react";
import Button from "../../ui/Button/Button";
import classes from "./card.module.scss";

const Card: FunctionComponent<{
  city: string;
  state: string;
  temperature: string;
}> = ({ city, state, temperature }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.location}>
        <h2>{city}</h2>
        <span>{state}</span>
      </div>
      <p>{temperature}</p>
      <Button
        customClass={classes.button}
        type="regular"
        text="View City"
        clickFn={() => console.log("redirect")}
      />
    </div>
  );
};

export default Card;

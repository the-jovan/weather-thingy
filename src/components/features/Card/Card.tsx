import { FunctionComponent } from "react";
import Button from "../../ui/Button/Button";
import classes from "./card.module.scss";

const Card: FunctionComponent<{
  city: string;
  state: string;
  temperature: string;
  clickFn: () => void;
}> = ({ city, state, temperature, clickFn }) => {
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
        clickFn={clickFn}
      />
    </div>
  );
};

export default Card;

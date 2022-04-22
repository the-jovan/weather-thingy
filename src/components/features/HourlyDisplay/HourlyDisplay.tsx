import { FunctionComponent, Fragment } from "react";
import classes from "./hourlyDisplay.module.scss";
import ConfiggedIcon from "../../../helpers/iconsConfig";

const HourlyDisplay: FunctionComponent<{
  data: any;
}> = ({ data }) => {
  return (
    <div className={classes.hd}>
      {Object.entries(data).map((item: any, key: number) => (
        <Fragment key={key}>
          <h1>{item[0]}</h1>
          <div className={classes.hd__cards}>
            {item[1].hourly.map((item: any, key: number) => (
              <div className={classes.card} key={key}>
                <p className={classes.card__time}>{item.time}h</p>
                <ConfiggedIcon icon={item.weather_icons[0]} />
                <p className={classes.card__t}>
                  {item.temperature}
                  <span>&#xb0;</span>C
                </p>
              </div>
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default HourlyDisplay;

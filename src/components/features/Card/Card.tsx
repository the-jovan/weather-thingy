import { FunctionComponent } from "react";
import classes from "./card.module.scss";
import { ICity } from "../../../models/ICity";

import Button from "../../ui/Button/Button";
import ConfiggedIcon from "../../../helpers/iconsConfig";

const Card: FunctionComponent<{
  data: ICity;
  type?: string;
  clickFn?: () => void;
}> = ({ data, type, clickFn }) => {
  const { name, country, region, lat, lon } = data.location;
  const {
    temperature,
    weather_icons,
    feelslike,
    humidity,
    pressure,
    wind_speed,
    uv_index,
  } = data.current;

  if (type === "small") {
    return (
      <div className={`${classes.wrapper} ${classes.card}`}>
        <div className={classes.card__location}>
          <h2>{name}</h2>
          <span>{country}</span>
        </div>
        <p>
          {temperature}
          <span>&#xb0;</span>C
        </p>
        <Button
          customClass={classes.card__button}
          type="regular"
          text="View City"
          clickFn={clickFn}
        />
      </div>
    );
  }

  return (
    <div className={`${classes.wrapper} ${classes.extended}`}>
      <div className={classes.extended__location}>
        <h1>{name}</h1>
        <p>
          {region}, {country} <br />
          {lat}N, {lon}E
        </p>
      </div>
      <div className={classes.extended__temperature}>
        <ConfiggedIcon icon={weather_icons[0]} />
        <p>
          {temperature}
          <span>&#xb0;</span>C
        </p>
      </div>
      <div className={classes.extended__info}>
        <ul>
          <li>
            <strong>Feels like</strong>
            {feelslike}
            <span>&#xb0;</span>C
          </li>
          <li>
            <strong>Humidity</strong>
            {humidity}%
          </li>
          <li>
            <strong>Pressure</strong>
            {pressure} mbar
          </li>
          <li>
            <strong>Wind</strong>
            {wind_speed} 3.1m/s SE
          </li>
          <li>
            <strong>UV Index</strong>
            {uv_index}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Card;

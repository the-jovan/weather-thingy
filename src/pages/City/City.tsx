import { useState, useEffect } from "react";
import classes from "./city.module.scss";
import { Link, useParams } from "react-router-dom";
import { ICity } from "../../models/ICity";
import { getCityData } from "../../services/api_cities";

import Card from "../../components/features/Card/Card";
import HourlyDisplay from "../../components/features/HourlyDisplay/HourlyDisplay";

const City = () => {
  const [cityData, setCityData] = useState<ICity>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { name } = useParams();

  useEffect(() => {
    setLoading(true);
    if (name) {
      getCityData(name)
        .then((resp) => {
          setCityData(resp);
          setLoading(false);
        })
        .catch((err) => {
          setError("That city is not in our database, sorry");
          setLoading(false);
        });
    }
  }, [name]);

  if (loading) return <div className={classes.city}>Loading...</div>;

  if (error)
    return (
      <div className={`${classes.city} ${classes.placeholder}`}>
        {error}, <Link to="/">return</Link>
      </div>
    );

  return (
    <div className={classes.city}>
      {cityData && (
        <>
          <Card data={cityData} />
          <div className={classes.hourly}>
            <HourlyDisplay data={cityData.historical} />
          </div>
        </>
      )}
    </div>
  );
};

export default City;

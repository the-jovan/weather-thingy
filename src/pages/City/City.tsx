import { useState, useLayoutEffect } from "react";
import classes from "./city.module.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../../components/features/Card/Card";
import HourlyDisplay from "../../components/features/HourlyDisplay/HourlyDisplay";

import { ICity } from "../../models/ICity";

const City = () => {
  const [cityData, setCityData] = useState<ICity>();
  const [loading, setLoading] = useState<boolean>(false);
  const { name } = useParams();

  useLayoutEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3001/${name}`).then((resp) => {
      setCityData(resp.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={classes.city}>
      {cityData ? (
        <>
          <Card data={cityData} />
          <div className={classes.hourly}>
            <HourlyDisplay data={cityData.historical} />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default City;

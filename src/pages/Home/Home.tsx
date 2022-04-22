import { FunctionComponent, useState, useLayoutEffect } from "react";
import classes from "./home.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { savedCities, parsedSavedCities } from "../../helpers/storage";
import {
  getCity,
  setCitiesSavedInLS,
  clearEverything,
} from "../../reducers/citiesSlice";

import Input from "../../components/features/Input/Input";
import Card from "../../components/features/Card/Card";
import Button from "../../components/ui/Button/Button";

const Home: FunctionComponent = () => {
  const [searchedCity, setSearchedCity] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cities, loading } = useSelector((state: any) => state);

  useLayoutEffect(() => {
    if (savedCities) {
      dispatch(setCitiesSavedInLS(parsedSavedCities));
      parsedSavedCities.forEach((city: string) => {
        dispatch(getCity(city));
      });
    }
  }, []);

  const saveCityToLS = (): void => {
    dispatch(getCity(searchedCity));
    setSearchedCity("");
  };

  if (loading)
    return (
      <div className={classes.home}>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <>
      <div className={classes.home}>
        <h1>Add cities</h1>
        <p>Add 5 cities whose temperature you want to track.</p>
        <Input
          searchTerm={searchedCity}
          setSearchTerm={setSearchedCity}
          placeholder="Search or add a city..."
          addFn={saveCityToLS}
          searchFn={() => navigate(`/${searchedCity}`)}
        />
        {cities.savedCitiesData.length ? (
          <Button
            type="regular"
            text="Clear selection"
            clickFn={() => dispatch(clearEverything())}
            customClass={classes.clearAllBtn}
          />
        ) : (
          ""
        )}
      </div>
      <div className={classes.cards}>
        {cities.savedCitiesData.map((data: any, key: number) => (
          <Card
            type="small"
            data={data}
            key={key}
            clickFn={() => navigate(`/${data.location.name}`)}
          />
        ))}
      </div>

      <div className={classes.supportedCities}>
        <h4>json-server supported cities for adding</h4>
        <ul>
          <li>New York</li>
          <li>Boston</li>
          <li>Los Angeles</li>
          <li>Washington</li>
          <li>Chicago</li>
          <li>Rome</li>
          <li>Paris</li>
          <li>Madrid</li>
        </ul>
      </div>
    </>
  );
};

export default Home;

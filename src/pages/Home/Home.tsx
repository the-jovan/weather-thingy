import { FunctionComponent, useState, useLayoutEffect } from "react";
import classes from "./home.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { savedCities, parsedSavedCities } from "../../helpers/storage";
import {
  getCity,
  setCitiesSavedInLS,
  clearEverything,
} from "../../reducers/citiesSlice";

import Input from "../../components/features/Input/Input";
import Card from "../../components/features/Card/Card";
import Button from "../../components/ui/Button/Button";
import JSSupport from "../../components/features/JSSupport/JSSupport";

const Home: FunctionComponent = () => {
  const [searchedCity, setSearchedCity] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
    if (searchedCity.length) {
      dispatch(getCity(searchedCity));
      setSearchedCity("");
    }
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
          searchFn={() => searchedCity.length && navigate(`/${searchedCity}`)}
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
        <div className={classes.cards__list}>
          {cities.savedCitiesData.map((data: any, key: number) => (
            <Card
              type="small"
              data={data}
              key={key}
              clickFn={() => navigate(`/${data.location.name}`)}
            />
          ))}
        </div>
      </div>

      <JSSupport />
    </>
  );
};

export default Home;

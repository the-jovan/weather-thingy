import { FunctionComponent, useState, useLayoutEffect, useEffect } from "react";
import classes from "./home.module.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
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
  const [disableAddButton, setDisableAddButton] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cities, loading } = useAppSelector((state: any) => state);

  useLayoutEffect(() => {
    if (savedCities) {
      dispatch(setCitiesSavedInLS(parsedSavedCities));
      parsedSavedCities.forEach((city: string) => {
        dispatch(getCity(city));
      });
    }
  }, []);

  useEffect(() => {
    cities.citiesSavedInLS.length === 5
      ? setDisableAddButton(true)
      : setDisableAddButton(false);
  }, [cities.citiesSavedInLS]);

  const saveCityToLS = (): void => {
    if (searchedCity.length && !disableAddButton) {
      dispatch(getCity(searchedCity));
      setSearchedCity("");
    } else if (disableAddButton) {
      toast(
        "You can follow up to 5 cities. Otherwise, please use the search option."
      );
    } else if (!searchedCity.length) {
      toast(
        "Literally every city in the world has at least one letter in its name. :)"
      );
    }
  };

  const searchForCity = (): void => {
    if (searchedCity.length) {
      navigate(`/${searchedCity}`);
    } else {
      toast(
        "Literally every city in the world has at least one letter in its name. :)"
      );
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
          searchFn={searchForCity}
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

import { FunctionComponent, useState, useLayoutEffect } from "react";
import classes from "./home.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCities,
  saveCity,
  removeCity,
  getCity,
} from "../../reducers/citiesSlice";
import { savedCities, parsedSavedCities } from "../../helpers/storage";

import Input from "../../components/features/Input/Input";
import Card from "../../components/features/Card/Card";

const Home: FunctionComponent = () => {
  const [searchedCity, setSearchedCity] = useState<string>("");
  const navigate = useNavigate();

  const { cities, loading } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (savedCities) {
      if (typeof parsedSavedCities === "string") {
        dispatch(getCity(parsedSavedCities));
      } else {
        parsedSavedCities.forEach((city: string) => {
          dispatch(getCity(city));
        });
      }
    }
  }, []);

  const addNewCity = () => {
    if (!cities.savedCities.includes(searchedCity) && !cities.limitReached) {
      dispatch(getCity(searchedCity));
      return dispatch(saveCity(searchedCity));
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.home}>
        <h1>Add cities</h1>
        <p>Add 5 cities whose temperature you want to track.</p>
        <Input
          searchTerm={searchedCity}
          setSearchTerm={setSearchedCity}
          placeholder="Search or add a city..."
          addFn={addNewCity}
          searchFn={() => console.log(searchedCity)}
        />
      </div>
      <div className={classes.cards}>
        {cities.selectedCities.map((data: any, key: number) => (
          <Card
            key={key}
            city={data.location.name}
            state={data.location.region}
            temperature={`${data.current.temperature}C`}
            clickFn={() =>
              navigate(`/${data.location.name}`, { state: { data } })
            }
          />
        ))}
      </div>

      <div className={classes.supportedCities}>
        <h4>json-server supported cities</h4>
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
    </div>
  );
};

export default Home;

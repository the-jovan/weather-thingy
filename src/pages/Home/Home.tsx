import { FunctionComponent, useState, useLayoutEffect } from "react";
import classes from "./home.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { savedCities, parsedSavedCities } from "../../helpers/storage";
import { getCity, setCitiesSavedInLS } from "../../reducers/citiesSlice";

import Input from "../../components/features/Input/Input";
import Card from "../../components/features/Card/Card";

const Home: FunctionComponent = () => {
  const [searchedCity, setSearchedCity] = useState<string>("");
  const navigate = useNavigate();

  const { cities, loading } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (savedCities) {
      dispatch(setCitiesSavedInLS(parsedSavedCities));
      parsedSavedCities.forEach((city: string) => {
        dispatch(getCity(city));
      });
    }
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.home}>
        <button onClick={() => console.log(cities)}>OKOK</button>
        <h1>Add cities</h1>
        <p>Add 5 cities whose temperature you want to track.</p>
        <Input
          searchTerm={searchedCity}
          setSearchTerm={setSearchedCity}
          placeholder="Search or add a city..."
          addFn={() => dispatch(getCity(searchedCity))}
          searchFn={() => console.log(searchedCity)}
        />
      </div>
      <div className={classes.cards}>
        {cities.savedCitiesData.map((data: any, key: number) => (
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

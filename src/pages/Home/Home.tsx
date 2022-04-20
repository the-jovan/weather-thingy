import { FunctionComponent, useState } from "react";
import classes from "./home.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { getCity, saveCity, removeCity } from "../../reducers/citiesSlice";

import Input from "../../components/features/Input/Input";
import Card from "../../components/features/Card/Card";

const Home: FunctionComponent = () => {
  const [searchedCity, setSearchedCity] = useState<string>("");

  const { cities, loading } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  return (
    <div className={classes.wrapper}>
      <div className={classes.home}>
        <h1>Add cities</h1>
        <p>Add 5 cities whose temperature you want to track.</p>
        <Input
          searchTerm={searchedCity}
          setSearchTerm={setSearchedCity}
          placeholder="Add a city..."
          // submitFn={() => dispatch(getCity(searchedCity))}
          submitFn={() => dispatch(saveCity(searchedCity))}
        />
        <button onClick={() => console.log(cities)}>Log</button>
        <button onClick={() => dispatch(removeCity(searchedCity))}>
          Remove
        </button>
      </div>
      <div className={classes.cards}>
        {cities.savedCities.map((city: string, key: number) => (
          <Card key={key} city={city} state="state" temperature="33c" />
        ))}
      </div>
    </div>
  );
};

export default Home;

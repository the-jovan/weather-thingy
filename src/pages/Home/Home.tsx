import { FunctionComponent, useState } from "react";
import classes from "./home.module.scss";

import Input from "../../components/features/Input/Input";
import Card from "../../components/features/Card/Card";

const Home: FunctionComponent = () => {
  const [searchedCity, setSearchedCity] = useState<string>("");

  return (
    <div className={classes.wrapper}>
      <div className={classes.home}>
        <h1>Add cities</h1>
        <p>Add 5 cities whose temperature you want to track.</p>
        <Input
          searchTerm={searchedCity}
          setSearchTerm={setSearchedCity}
          placeholder="Add a city..."
        />
      </div>
      <div className={classes.cards}>
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Home;

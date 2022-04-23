import axios from "axios";
import { ICity } from "../models/ICity";

export const getCityData = async (name: string): Promise<ICity> => {
  const resp = await axios.get(
    // `http://api.weatherstack.com/current?access_key=37e616bd505f25166a034f67a89ff8d7&query=${name}`
    `http://localhost:3001/${name}`
  );
  return resp.data;
};

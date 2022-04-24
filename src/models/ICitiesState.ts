import { ICity } from "./ICity";

export interface ICitiesState {
  citiesSavedInLS: string[];
  savedCitiesData: ICity[];
  loading: boolean;
}

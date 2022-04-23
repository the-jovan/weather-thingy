import { ICity } from "./ICity";

export interface ICitiesState {
  citiesSavedInLS: string[];
  limitOfLSReached: boolean;
  savedCitiesData: ICity[];
  loading: boolean;
}

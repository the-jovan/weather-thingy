import { combineReducers } from "redux";
import citiesReducer from "./../reducers/citiesSlice";

const rootReducer = combineReducers({
  cities: citiesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

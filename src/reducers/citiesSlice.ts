import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCityData } from "../services/api_cities";
import { ICitiesState } from "../models/ICitiesState";
import { ICity } from "../models/ICity";

export const getCity: any = createAsyncThunk(
  "city/getCity",
  async (name: string, { rejectWithValue }) => {
    try {
      const fetchedCityData = getCityData(name);
      return fetchedCityData;
    } catch {
      return rejectWithValue("That city is not in our database");
    }
  }
);

const initialState: ICitiesState = {
  citiesSavedInLS: [],
  savedCitiesData: [],
  loading: false,
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCitiesSavedInLS: (
      state: ICitiesState,
      action: PayloadAction<string[]>
    ) => {
      state.citiesSavedInLS = action.payload;
    },
    clearEverything: (state: ICitiesState) => {
      state.citiesSavedInLS = [];
      state.savedCitiesData = [];
      state.loading = false;
      localStorage.removeItem("locallySavedCities");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getCity.rejected,
      (state: ICitiesState, action: PayloadAction<string>) => {
        state.loading = false;
        console.log(action.payload);
      }
    );
    builder.addCase(getCity.pending, (state: ICitiesState) => {
      state.loading = true;
    });
    builder.addCase(
      getCity.fulfilled,
      (state: ICitiesState, action: PayloadAction<ICity>) => {
        let searchedCityName = action.payload.location.name;

        const updateState = () => {
          state.loading = false;
          state.savedCitiesData = [...state.savedCitiesData, action.payload];
        };

        if (
          state.citiesSavedInLS.length < 5 &&
          !state.citiesSavedInLS.includes(searchedCityName)
        ) {
          if (localStorage.getItem("locallySavedCities")) {
            state.citiesSavedInLS.push(searchedCityName);
            localStorage.setItem(
              "locallySavedCities",
              JSON.stringify([
                ...JSON.parse(localStorage.getItem("locallySavedCities")!),
                searchedCityName,
              ])
            );
          } else {
            state.citiesSavedInLS.push(searchedCityName);
            localStorage.setItem(
              "locallySavedCities",
              JSON.stringify([searchedCityName])
            );
          }
          updateState();
        } else if (
          state.savedCitiesData.length < state.citiesSavedInLS.length
        ) {
          updateState();
        }
      }
    );
  },
});

export const { setCitiesSavedInLS, clearEverything } = citiesSlice.actions;

export default citiesSlice.reducer;

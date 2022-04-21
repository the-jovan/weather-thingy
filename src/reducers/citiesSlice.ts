import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface CitiesState {
  citiesSavedInLS: string[];
  limitOfLSReached: boolean;
  savedCitiesData: any[];
  loading: boolean;
}

export const getCity: any = createAsyncThunk(
  "city/getCity",
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        // `http://api.weatherstack.com/current?access_key=37e616bd505f25166a034f67a89ff8d7&query=${name}`
        `http://localhost:3001/${name}`
      );
      return response.data;
    } catch {
      return rejectWithValue("That city is not in our database");
    }
  }
);

const initialState: CitiesState = {
  citiesSavedInLS: [],
  limitOfLSReached: false,
  savedCitiesData: [],
  loading: false,
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCitiesSavedInLS: (state, action) => {
      state.citiesSavedInLS = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCity.rejected, (state, action) => {
      state.loading = false;
      console.log(action.payload);
    });
    builder.addCase(getCity.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCity.fulfilled, (state, action) => {
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
        state.citiesSavedInLS.length === 5 &&
        state.savedCitiesData.length < 5
      ) {
        updateState();
      }
    });
  },
});

export const { setCitiesSavedInLS } = citiesSlice.actions;

export default citiesSlice.reducer;

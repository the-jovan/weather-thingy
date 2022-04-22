import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface CitiesState {
  citiesSavedInLS: string[];
  limitOfLSReached: boolean;
  savedCitiesData: any[];
  loading: boolean;
  searchedCityData: any;
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
//! DUPLICATE!!!
// export const searchForCity: any = createAsyncThunk(
//   "city/searchCity",
//   async (name: string, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         // `http://api.weatherstack.com/current?access_key=37e616bd505f25166a034f67a89ff8d7&query=${name}`
//         `http://localhost:3001/${name}`
//       );

//       return response.data;
//     } catch {
//       return rejectWithValue("That city is not in our database");
//     }
//   }
// );

const initialState: CitiesState = {
  citiesSavedInLS: [],
  limitOfLSReached: false,
  savedCitiesData: [],
  loading: false,
  searchedCityData: "",
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCitiesSavedInLS: (state, action) => {
      state.citiesSavedInLS = action.payload;
    },
    clearEverything: (state) => {
      state.citiesSavedInLS = [];
      state.limitOfLSReached = false;
      state.savedCitiesData = [];
      state.loading = false;
      localStorage.removeItem("locallySavedCities");
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
      } else if (state.savedCitiesData.length < state.citiesSavedInLS.length) {
        updateState();
      }
    });
    // builder.addCase(searchForCity.rejected, (state, action) => {
    //   state.loading = false;
    //   console.log(action.payload);
    // });
    // builder.addCase(searchForCity.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(searchForCity.fulfilled, (state, action) => {
    //   state.searchedCityData = action.payload;
    // });
  },
});

export const { setCitiesSavedInLS, clearEverything } = citiesSlice.actions;

export default citiesSlice.reducer;

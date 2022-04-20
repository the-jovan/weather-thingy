import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { savedCities, saveCitiesToLocalStorage } from "../helpers/storage";

export interface CitiesState {
  savedCities: string[];
  limitReached: boolean;
  selectedCities: any[];
  loading: boolean
}

export const getCity:any = createAsyncThunk(
  "city/getCity",
  async(name:string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://api.weatherstack.com/current?access_key=37e616bd505f25166a034f67a89ff8d7&query=${name}`
      )

      return response.data
    } catch {
      return rejectWithValue("That city is not in our database")
    }
  }
)


const initialState: CitiesState = {
  savedCities: [],
  limitReached: false,
  selectedCities: [],
  loading: false
}

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    saveCity: (state, action): void => {
      let locallySavedCities = JSON.parse(localStorage.getItem("savedCities")!)
      let numOfSavedCities = locallySavedCities?.length

      if (!state.savedCities.includes(action.payload)) {
        if (locallySavedCities && !state.limitReached) {
          let items = localStorage.getItem("savedCities")
          if (typeof locallySavedCities === 'string') {
            state.savedCities.push(action.payload)
            let x = [JSON.parse(items!), action.payload]
            localStorage.setItem("savedCities", JSON.stringify(x))
          } else {
            if (numOfSavedCities < 5) {
              state.savedCities.push(action.payload)
              let x = [...JSON.parse(items!), action.payload]
              localStorage.setItem("savedCities", JSON.stringify(x))
              if (numOfSavedCities === 4) {
                state.limitReached = true
              }
            }
          }
        } else if (!numOfSavedCities) {
          state.savedCities.push(action.payload)
          localStorage.setItem("savedCities", JSON.stringify(action.payload))
        } else {
          state.limitReached = true
        }
      }
    },
    removeCity: (state, action): void => {
      state.savedCities = state.savedCities.filter((city: string) => city !== action.payload)
      let savedCities = JSON.parse(localStorage.getItem("savedCities")!)
      let x = savedCities.filter((city: string) => city !== action.payload)
      localStorage.setItem("savedCities", JSON.stringify(x))
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCity.rejected, (state, action) => {
      state.loading = false
      console.log(action.payload)
    });
    builder.addCase(getCity.pending, (state) => {
      state.loading = true
    });
    builder.addCase(getCity.fulfilled, (state, action) => {
      console.log("action", action)
      state.loading = false
      state.selectedCities = [action.payload]
    })
  }
})

export const { saveCity, removeCity } = citiesSlice.actions

export default citiesSlice.reducer
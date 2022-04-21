import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
        // `http://api.weatherstack.com/current?access_key=37e616bd505f25166a034f67a89ff8d7&query=${name}`
        `http://localhost:3001/${name}`
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
    setCities: (state, action): void => {
      state.savedCities = action.payload
    },
    saveCity: (state, action): void => {},
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
      if (!state.savedCities.includes(action.payload.location.name)) {
      console.log("action", action)
      state.loading = false
      state.selectedCities = [...state.selectedCities, action.payload]


      let locallySavedCities = JSON.parse(localStorage.getItem("savedCities")!)
      let numOfSavedCities = locallySavedCities?.length
      let name = action.payload.location.name

        if (locallySavedCities && !state.limitReached) {
          let items = localStorage.getItem("savedCities")
          if (typeof locallySavedCities === 'string') {
            state.savedCities.push(name)
            let x = [JSON.parse(items!), name]
            localStorage.setItem("savedCities", JSON.stringify(x))
          } else {
            if (numOfSavedCities < 5) {
              state.savedCities.push(name)
              let x = [...JSON.parse(items!), name]
              localStorage.setItem("savedCities", JSON.stringify(x))
              if (numOfSavedCities === 4) {
                state.limitReached = true
              }
            }
          }
        } else if (!numOfSavedCities) {
          state.savedCities.push(name)
          localStorage.setItem("savedCities", JSON.stringify(name))
        } else {
          state.limitReached = true
        }
      }
    })
  }
})

export const { setCities, saveCity, removeCity } = citiesSlice.actions

export default citiesSlice.reducer
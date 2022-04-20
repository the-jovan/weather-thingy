import { combineReducers } from 'redux'
import citiesReducer from './../reducers/citiesSlice'

const rootReducer = combineReducers({
  cities: citiesReducer
})

export default rootReducer
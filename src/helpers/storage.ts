export const savedCities = JSON.parse(localStorage.getItem("savedCities")!)
export const saveCitiesToLocalStorage = (data: any) => {
  localStorage.setItem("savedCities", data)
}
export const savedCities = localStorage.getItem("savedCities")
export const parsedSavedCities = JSON.parse(savedCities!)
export const saveCitiesToLocalStorage = (data: string) => {
  localStorage.setItem("savedCities", data)
}
export const savedCities = localStorage.getItem("locallySavedCities")
export const parsedSavedCities = JSON.parse(savedCities!)
export const saveCitiesToLocalStorage = (data: string) => {
  localStorage.setItem("locallySavedCities", data)
}
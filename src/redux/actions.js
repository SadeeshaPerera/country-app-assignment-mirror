export const setCountries = (countries) => ({
  type: "SET_COUNTRIES",
  payload: countries,
});

export const fetchCountryDetails = (code) => (dispatch) => {
  fetch(`https://restcountries.com/v3.1/alpha/${code}`)
    .then((response) => response.json())
    .then((data) =>
      dispatch({ type: "SET_SELECTED_COUNTRY", payload: data[0] })
    )
    .catch((error) => console.error("Error fetching country details:", error));
};

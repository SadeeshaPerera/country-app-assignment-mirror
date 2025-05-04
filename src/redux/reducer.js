const initialState = {
  countries: [],
  selectedCountry: null,
};

const countryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COUNTRIES":
      return { ...state, countries: action.payload || [] }; // Ensure payload is an array
    case "SET_SELECTED_COUNTRY":
      return { ...state, selectedCountry: action.payload || null }; // Ensure payload is valid
    case "CLEAR_SELECTED_COUNTRY":
      return { ...state, selectedCountry: null };
    default:
      return state;
  }
};

export default countryReducer;

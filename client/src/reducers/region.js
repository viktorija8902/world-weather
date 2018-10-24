let initialState = {
  selectedRegion: "",
  cities: [],
  rainCities: new Set(),
  cloudCities: new Set(),
  noDataCustomSearch: false,
  error: null,
  errorInCustomSearch: null,
}

const region = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_REGION':
      return Object.assign({}, state, {
        selectedRegion: action.selectedRegion,
        error: null,
        errorInCustomSearch: null,
      })
    case 'LOAD_DATA':
      const cities = [...action.cityData.cities];
      const rainCities = new Set(cities.filter(city => city.rain !== null).map(city => city.id));
      const cloudCities = new Set(cities.filter(city => city.clouds.today > 0).map(city => city.id));
      return Object.assign({}, state, {
        rainCities: rainCities,
        cloudCities: cloudCities,
        cities: cities,
        noDataCustomSearch: false,
        error: null,
        errorInCustomSearch: null,
      })
    case 'SHOW_ERROR':
      return Object.assign({}, state, {
        error: action.error,
        errorInCustomSearch: null,
      })
    case 'NO_RESULTS_CUSTOM_SEARCH':
      return Object.assign({}, state, {
        noDataCustomSearch: true,
        error: null,
        errorInCustomSearch: null,
      })
    case 'ERROR_IN_CUSTOM_SEARCH':
      return Object.assign({}, state, {
        error: null,
        errorInCustomSearch: action.error,
      });
    default:
      return state
  }
}

export default region;
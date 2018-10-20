let initialState = {
  selectedRegion: "",
  noResults: false,
  noDataCustomSearch: false,
  cities: [],
  rainCities: [],
  cloudCities: [],
}

const region = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_REGION':
      return Object.assign({}, state, {
        selectedRegion: action.selectedRegion,
      })
    case 'LOAD_DATA':
      const cities = [...action.cityData.cities];
      const rainCities = new Set(cities.filter(city => city.rain !== null).map(city => city.id));
      const cloudCities = new Set(cities.filter(city => city.clouds.today > 0).map(city => city.id));
      return Object.assign({}, state, {
        rainCities: rainCities,
        cloudCities: cloudCities,
        noResults: false,
        cities: cities,
        noDataCustomSearch: false,
      })
    case 'LOAD_NO_RESULTS':
      return Object.assign({}, state, {
        noResults: true,
      })
    case 'NO_RESULTS_CUSTOM_SEARCH':
      return Object.assign({}, state, {
        noDataCustomSearch: true,
      })
    default:
      return state
  }
}

export default region;
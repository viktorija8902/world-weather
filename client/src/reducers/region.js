let initialState = {
  selectedRegion: "",
  regionData: null,
  noResults: false,
  noDataCustomSearch: false,
  rainCities: [],
  cloudCities: [],
}

const region = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_REGION':
      return Object.assign({}, state, {
        selectedRegion: action.selectedRegion
      })
    case 'LOAD_DATA':
      let rainCities = new Set(action.regionData.rainData.rainCityList.filter(city => city.rain !== null).map(city => city.name));
      let cloudCities = new Set(action.regionData.cloudData.cloudCityList.filter(city => city.cloudCoverage !== 0).map(city => city.name));
      return Object.assign({}, state, {
        regionData: action.regionData,
        rainCities: rainCities,
        cloudCities: cloudCities,
        noResults: false,
        noDataCustomSearch: false,
      })
    case 'LOAD_NO_RESULTS':
      return Object.assign({}, state, {
        regionData: null,
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
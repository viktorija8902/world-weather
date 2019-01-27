let initialState = {
  selectedRegion: "",
  cities: [],
  rainCities: new Set(),
  cloudCities: new Set(),
  noDataCustomSearch: false,
  error: "",
  errorInCustomSearch: "",
}

const region = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_REGION':
      return Object.assign({}, state, {
        selectedRegion: action.selectedRegion,
        error: "",
        errorInCustomSearch: "",
      })
    case 'LOAD_DATA':
      const cities = [...action.cityData.cities];
      const cloudCities = new Set(cities.filter(city => city.clouds.today > 0).map(city => city.id));
      const windCitiesMap = cities.reduce(
        (windMap,city) => {
          (windMap.has(city.wind.type)) ? windMap.get(city.wind.type).add(city.id) : windMap.set(city.wind.type, new Set([city.id]));
          return windMap;
        }, new Map()
      );
      return Object.assign({}, state, {
        rainCities: filterCitiesWithCondition(cities, "rain"),
        snowCities: filterCitiesWithCondition(cities, "snow"),
        cloudCities: cloudCities,
        windCitiesMap: windCitiesMap,
        cities: cities,
        noDataCustomSearch: false,
        error: "",
        errorInCustomSearch: "",
      })
    case 'SHOW_ERROR':
      return Object.assign({}, state, {
        error: action.error,
        errorInCustomSearch: "",
      })
    case 'NO_RESULTS_CUSTOM_SEARCH':
      return Object.assign({}, state, {
        noDataCustomSearch: true,
        error: "",
        errorInCustomSearch: "",
      })
    case 'ERROR_IN_CUSTOM_SEARCH':
      return Object.assign({}, state, {
        error: "",
        errorInCustomSearch: action.error,
      });
    default:
      return state
  }
}

const filterCitiesWithCondition = (cities, condition) => {
  return new Set(cities.filter(city => city[condition] !== null).map(city => city.id));
}

export default region;

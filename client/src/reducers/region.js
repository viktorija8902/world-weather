let initialState = {
  selectedRegion: "",
  regionData: null,
  noResults: false,
  noDataCustomSearch: false,
}

const region = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_REGION':
      return Object.assign({}, state, {
        selectedRegion: action.selectedRegion
      })
    case 'LOAD_DATA':
      return Object.assign({}, state, {
        regionData: action.regionData,
        noResults: false,
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
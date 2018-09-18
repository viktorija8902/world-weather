let initialState = {
  selectedRegion: "",
  regionData: null,
}

const region = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_REGION':
      return Object.assign({}, state, {
        selectedRegion: action.selectedRegion
      })
    case 'LOAD_DATA':
      return Object.assign({}, state, {
        regionData: action.regionData
      })
    default:
      return state
  }
}

export default region;
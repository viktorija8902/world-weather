import { MESSAGE } from "../constants/Constants";

export const selectRegion = (selectedRegion) => {
  return {
    type: 'SELECT_REGION',
    selectedRegion: selectedRegion
  }
}

export const getWeatherData = selectedRegion => dispatch => {
  fetchData(`/api/weather/${selectedRegion}`)
    .then(resp => {
      if (resp.cities && resp.cities.length > 0) {
        dispatch(loadData(resp));
      } else {
        dispatch(showError(MESSAGE.ERROR));
      }
    })
    .catch(error => {
      console.error(error);
      dispatch(showError(MESSAGE.ERROR));
    });
}

export const getCustomWeatherData = coordinates => dispatch => {
  fetchData(`/api/weather/custom-coords/${coordinates.lonTopLeft},${coordinates.latBottomLeft},${coordinates.lonBottomRight},${coordinates.latTopRight}`)
    .then(resp => {
      if (resp.cities && resp.cities.length > 0) {
        dispatch(loadData(resp));
      } else if (resp.cities && resp.cities.length === 0) {
        dispatch(loadNoResultsCustomSearch());
      } else {
        dispatch(errorInCustomSearch(MESSAGE.ERROR));
      }
    })
    .catch(error => {
      console.error(error);
      dispatch(errorInCustomSearch(MESSAGE.ERROR));
    });
}

async function fetchData(url) {
  const response = await fetch(url);
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);

  return body;
};

const loadData = (data) => ({ type: 'LOAD_DATA', cityData: data });
const showError = (error) => ({type: 'SHOW_ERROR', error: error});
const loadNoResultsCustomSearch = () => ({ type: 'NO_RESULTS_CUSTOM_SEARCH' });
const errorInCustomSearch = (error) => ({ type: 'ERROR_IN_CUSTOM_SEARCH', error: error});

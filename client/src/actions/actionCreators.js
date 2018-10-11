export const selectRegion = (selectedRegion) => {
  return {
    type: 'SELECT_REGION',
    selectedRegion: selectedRegion
  }
}

export const getWeatherData = selectedRegion => dispatch => {
  fetchData(`/api/weather/${selectedRegion}`)
    .then(resp => {
      if (resp.message === "no data" || resp.message === "error" || (resp.output && Object.keys(resp.output).length === 0)) {
        dispatch(loadNoResults());
      } else {
        dispatch(loadData(resp.output));
      }
    })
    .catch(error => {
      console.log(error);
      loadNoResults();
    });
}

export const getCustomWeatherData = coordinates => dispatch => {
  fetchData(`/api/weather/custom-coords/${coordinates.lonTopLeft},${coordinates.latBottomLeft},${coordinates.lonBottomRight},${coordinates.latTopRight}`)
    .then(resp => {
      console.log(resp);
      if (resp.message === "no data" || resp.message === "error" || (resp.output && Object.keys(resp.output).length === 0)) {
        dispatch(loadNoResultsCustomSearch());
      } else {
        dispatch(loadData(resp.output));
      }
    })
    .catch(error => {
      console.log(error);
      loadNoResults();
    });
}

async function fetchData(url) {
  const response = await fetch(url);
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);

  return body;
};

const loadData = (data) => ({ type: 'LOAD_DATA', regionData: data });
const loadNoResults = () => ({ type: 'LOAD_NO_RESULTS' });
const loadNoResultsCustomSearch = () => ({ type: 'NO_RESULTS_CUSTOM_SEARCH' });

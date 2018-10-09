export const selectRegion = (selectedRegion) => {
  return {
    type: 'SELECT_REGION',
    selectedRegion: selectedRegion
  }
}

export const getWeatherData = selectedRegion => dispatch => {
  fetchData(`/api/weather/${selectedRegion}`)
    .then(resp => {
      console.log(resp);
      if (resp.message === "no data" || (resp.output && Object.keys(resp.output).length === 0)) {
        dispatch(loadNoResults());
      } else {
        dispatch(loadData(resp.output));
      }
    })
    .catch(error => console.log(error));
}

async function fetchData(url) {
  const response = await fetch(url);
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);

  return body;
};

const loadData = (data) => ({ type: 'LOAD_DATA', regionData: data });
const loadNoResults = () => ({ type: 'LOAD_NO_RESULTS' });

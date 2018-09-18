import { regionList } from "../data/Regions";


export function selectRegion(selectedRegion) {
  return {
    type: 'SELECT_REGION',
    selectedRegion: selectedRegion
  }
}

export const getWeatherData = selectedRegion => dispatch => {
  const coordinates = getCoordinates(selectedRegion);
  const url = `/api/weather/${coordinates.lonTopLeft},${coordinates.latBottomLeft},${coordinates.lonBottomRight},${coordinates.latTopRight}`;
  fetchData(url)
    .then(resp => {
      dispatch(loadData(resp))
    })
    .catch(error => console.log(error));
}

const getCoordinates = (place) => {
  const list = regionList.map(region => {
    return region.parts.concat(region.main);
  });
  const preparedList = [].concat(...list);
  const region = preparedList.find(region => {
    return region.name === place;
  })
  return region.coord;
}

async function fetchData(url) {
  const response = await fetch(url);
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);

  return body;
};

function loadData(data) {
  return {
    type: 'LOAD_DATA',
    regionData: data
  }
}

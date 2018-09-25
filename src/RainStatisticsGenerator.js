export function generateRainData(citiesWeatherData) {
  const rainIdsStartWith = 5;
  const rainCityList = getCityRainList(rainIdsStartWith, citiesWeatherData)
  rainCityList.sort((a,b) => a.rain != null && b.rain != null ? a.rain.localeCompare(b.rain) : a.rain == null ? 1 : -1);
  const rainPercentage = getRainPercentage(rainCityList);
  return {
    rainCityList: rainCityList,
    rainSummary: `It is raining in ${rainPercentage}% of the selected cities.`
  };
}

function getCityRainList(id, allCities) {
  return allCities.map(city => {
    const rain = city.weather.find(weather => weather.id.toString().startsWith(id));
    if (rain) {
      return {
        name: city.name,
        rain: rain.description
      }
    } else {
      return {
        name: city.name,
        rain: null
      }
    }
  });
}

function getRainPercentage(cities) {
  const citiesWithRain = cities.filter(city => city.rain !== null);
  return calculatePercentage(cities.length, citiesWithRain.length);
}

//TODO move to separate file
function calculatePercentage(numberOfCities, citiesWithSpecificWeather) {
  return (citiesWithSpecificWeather * 100 / numberOfCities).toFixed(2);
}

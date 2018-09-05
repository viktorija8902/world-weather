export function generateRainData(citiesWeatherData) {
    const sortedByRain = sortByRain(citiesWeatherData);
    const cityRainList = getCityRainList(sortedByRain);
    const rainPercentage = getRainPercentage(cityRainList);

    console.log("Rain in the last 3 hours: ", cityRainList)
    console.log(`Right now it is raining in ${rainPercentage} % of the selected cities`)
}

function getCityRainList(data) {
    return data.map(city => {
        return {
            name: city.name,
            rainInLastThreeHours: city.rain
        }
    });
}

function sortByRain(citiesWeatherData) {
    return citiesWeatherData.sort((a,b) => a.rain - b.rain);
}

function getRainPercentage(cities) {
    const citiesWithRain = cities.filter(city => city.rainInLastThreeHours !== null)
    return calculatePercentage(cities.length, citiesWithRain.length)
}

//TODO move to separate file
function calculatePercentage(numberOfCities, citiesWithSpecificWeather) {
    return (citiesWithSpecificWeather*100/numberOfCities).toFixed(2);
}

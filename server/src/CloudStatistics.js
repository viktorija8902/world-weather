export function generateCloudData(citiesWeatherData) {
    const sortedByCloudCoverage = sortByCloudCoverage(citiesWeatherData);
    const cityCloudList = getCityCloudList(sortedByCloudCoverage)
    const cloudPercentage = getCloudPercentage(cityCloudList);

    console.log("Cities with highest cloud coverage (%): ", cityCloudList)
    console.log(`Right now it is cloudy in ${cloudPercentage} percent of the selected cities`)
    return cloudPercentage;
}

function sortByCloudCoverage(citiesWeatherData) {
    return citiesWeatherData.sort((a,b) => a.clouds.today - b.clouds.today);
}

function getCityCloudList(data) {
    return data.map(city => {
        return {
            name: city.name,
            cloudCoverage: city.clouds.today
        }
    });
}

function getCloudPercentage(cities) {
    const citiesWithoutClouds = cities.filter(city => city.cloudCoverage !== 0)
    return calculatePercentage(cities.length, citiesWithoutClouds.length)
}

//TODO move to separate file
function calculatePercentage(numberOfCities, citiesWithSpecificWeather) {
    return (citiesWithSpecificWeather*100/numberOfCities).toFixed(2);
}

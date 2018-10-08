import { HEAT } from "./Constants.js";

export function generateTemperatureData(citiesWeatherData) {
    const citiesWithTemperature = citiesWeatherData.map(city => ({ name: city.name, temperature: city.main.temp }));
    const sortedByTemperature = citiesWithTemperature.sort((a, b) => b.temperature - a.temperature);
    let heatMap = new Map();
    Object.keys(HEAT).forEach(temperature => heatMap.set(temperature, []));
    citiesWithTemperature.forEach(city => {
        addToHeatMap(city, heatMap);
    });
    console.log("Cities grouped by temperature: ", heatMap);
    return {
        temperatureCityList: sortedByTemperature,
        citiesGroupedByTemperature: [...heatMap.entries()],
    };
}

function addToHeatMap(city, heatMap) {
    Object.entries(HEAT).forEach(heat => {
        const mapsKey = heat[0];
        const minTemp = heat[1].min;
        const maxTemp = heat[1].max;
        if (city.temperature > minTemp && city.temperature <= maxTemp) {
            let cities = heatMap.get(mapsKey);
            heatMap.set(mapsKey, cities.concat(city.name));
        }
    });
    return heatMap;
}
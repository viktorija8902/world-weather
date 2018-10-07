import { WIND_SPEED } from "./Constants.js";

export function generateWindData(citiesWeatherData) {
    const sortedByWind = sortByWind(citiesWeatherData);
    const cityWindList = getCityWindList(sortedByWind);

    const citiesGroupedByWind = getCitiesGroupedByWind(cityWindList);
    const windSummary = getWindSummary(citiesGroupedByWind, cityWindList);
    return {
        windCityList: cityWindList,
        citiesGroupedByWind: [...citiesGroupedByWind.entries()],
        windSummary: windSummary
    };
}

function sortByWind(citiesWeatherData) {
    return citiesWeatherData.sort((a,b) => a.wind.speed - b.wind.speed);
}

function getCityWindList(data) {
    return data.map(city => {
        const speedInKmPerHour = metersPerSecondToKmPerHour(city.wind.speed)
        return {
            name: city.name,
            windSpeed: speedInKmPerHour
        }
    });
}

const metersPerSecondToKmPerHour = (speed) => speed * 3.6;
const knotsToKmPerHour = (speed) => speed * 1.852;



function getCitiesGroupedByWind(cityWindList) {
    let citiesGroupedByWind = new Map();
    
    let winds = Object.keys(WIND_SPEED);
    let speeds = Object.values(WIND_SPEED);
    let windsKmPerHour = new Map();

    for (let i = 0; i < winds.length; i++) {
        citiesGroupedByWind.set(winds[i], []);
        windsKmPerHour.set(winds[i], {
            min: knotsToKmPerHour(speeds[i].min),
            max: knotsToKmPerHour(speeds[i].max)
        })
    }
    // TODO refactor
    cityWindList.forEach(city => {
        const windSpeed = city.windSpeed;
        switch (true) {
            case (windSpeed < windsKmPerHour.get("LIGHT_WINDS").max):
                addToWindMap(citiesGroupedByWind, "LIGHT_WINDS", city.name)
                break;
            case (windSpeed >= windsKmPerHour.get("MODERATE_WINDS").min && windSpeed <= windsKmPerHour.get("MODERATE_WINDS").max):
                addToWindMap(citiesGroupedByWind, "MODERATE_WINDS", city.name)
                break;
            case (windSpeed >= windsKmPerHour.get("STRONG_WIND_SMALL_CRAFT_WARNING").min && windSpeed <= windsKmPerHour.get("STRONG_WIND_SMALL_CRAFT_WARNING").max):
                addToWindMap(citiesGroupedByWind, "STRONG_WIND_SMALL_CRAFT_WARNING", city.name)   
                break;
            case (windSpeed >= windsKmPerHour.get("GALE_WARNING").min && windSpeed <= windsKmPerHour.get("GALE_WARNING").max):
                addToWindMap(citiesGroupedByWind, "GALE_WARNING", city.name) 
                break;
            case (windSpeed >= windsKmPerHour.get("STORM_WARNING").min && windSpeed <= windsKmPerHour.get("STORM_WARNING").max):
                addToWindMap(citiesGroupedByWind, "STORM_WARNING", city.name) 
                break;
            case (windSpeed >= windsKmPerHour.get("HURRICANE_FORCE_WIND_WARNING").min):
                addToWindMap(citiesGroupedByWind, "HURRICANE_FORCE_WIND_WARNING", city.name) 
                break;
            default:
                console.log("Error: ", city);
        }
    })
    return citiesGroupedByWind;
}

function getWindSummary(citiesGroupedByWind, cityWindList) {
    let windStatictics = {};
    citiesGroupedByWind.forEach((value, key) => {
        windStatictics[key] = (value.length*100/cityWindList.length).toFixed(2)
    })
    return windStatictics;
}

function addToWindMap(citiesGroupedByWind, windType, cityName) {
    const cityList = citiesGroupedByWind.get(windType)
    if (cityList) {
        citiesGroupedByWind.set(windType, cityList.concat(cityName))
    } else {
        citiesGroupedByWind.set(windType, [cityName])
    }
}

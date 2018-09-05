import { WIND_SPEED } from "./Constants.js";

export function generateWindData(citiesWeatherData) {
    const sortedByWind = sortByWind(citiesWeatherData);
    const cityWindList = getCityWindList(sortedByWind);

    console.log("Winds in cities (km/h): ",  cityWindList)
    const windsStatistics = getWindsStatictics(cityWindList);
    console.log("Wind statictics based on speed: ", windsStatistics)
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



function getWindsStatictics(cityWindList) {
    let citiesGoupedByWind = new Map();
    
    let winds = Object.keys(WIND_SPEED);
    let speeds = Object.values(WIND_SPEED);
    let windsKmPerHour = new Map();

    for (let i = 0; i < winds.length; i++) {
        citiesGoupedByWind.set(winds[i], []);
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
                addToWindMap(citiesGoupedByWind, "LIGHT_WINDS", city.name)
                break;
            case (windSpeed >= windsKmPerHour.get("MODERATE_WINDS").min && windSpeed <= windsKmPerHour.get("MODERATE_WINDS").max):
                addToWindMap(citiesGoupedByWind, "MODERATE_WINDS", city.name)
                break;
            case (windSpeed >= windsKmPerHour.get("STRONG_WIND_SMALL_CRAFT_WARNING").min && windSpeed <= windsKmPerHour.get("STRONG_WIND_SMALL_CRAFT_WARNING").max):
                addToWindMap(citiesGoupedByWind, "STRONG_WIND_SMALL_CRAFT_WARNING", city.name)   
                break;
            case (windSpeed >= windsKmPerHour.get("GALE_WARNING").min && windSpeed <= windsKmPerHour.get("GALE_WARNING").max):
                addToWindMap(citiesGoupedByWind, "GALE_WARNING", city.name) 
                break;
            case (windSpeed >= windsKmPerHour.get("STORM_WARNING").min && windSpeed <= windsKmPerHour.get("STORM_WARNING").max):
                addToWindMap(citiesGoupedByWind, "STORM_WARNING", city.name) 
                break;
            case (windSpeed >= windsKmPerHour.get("HURRICANE_FORCE_WIND_WARNING").min):
                addToWindMap(citiesGoupedByWind, "HURRICANE_FORCE_WIND_WARNING", city.name) 
                break;
            default:
                console.log("Error: ", city);
        }
    })
    console.log("citiesGoupedByWind", citiesGoupedByWind)
    let windStatictics = []
    citiesGoupedByWind.forEach((value, key) => {
        windStatictics = windStatictics.concat({[key]: (value.length*100/cityWindList.length).toFixed(2)})
    })
    return windStatictics;
}

function addToWindMap(citiesGoupedByWind, windType, cityName) {
    const cityList = citiesGoupedByWind.get(windType)
    if (cityList) {
        citiesGoupedByWind.set(windType, cityList.concat(cityName))
    } else {
        citiesGoupedByWind.set(windType, [cityName])
    }
}

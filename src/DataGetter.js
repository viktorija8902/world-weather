require('dotenv').config();
import fetch from "isomorphic-fetch";

import { generateWindData } from "./WindStatisticsGenerator.js";
import { generateCloudData } from "./CloudStatistics.js";
import { generateRainData } from "./RainStatisticsGenerator.js";
import { generateTemperatureData } from "./TemperatureStatisticsGenerator.js";



export function dataGetter({lonTopLeft, latBottomLeft, lonBottomRight, latTopRight}) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.openweathermap.org/data/2.5/box/city?bbox=${lonTopLeft},${latBottomLeft},${lonBottomRight},${latTopRight}&APPID=${process.env.API_KEY}`)
            .then(data => resolve(data.json()))
            .catch(error => reject(error))
    }).then(data => {
        const citiesWeatherData = data.list;
        if (citiesWeatherData && citiesWeatherData.length > 0) {
            return {
                cities: data.list.map(city=> ({name: city.name, coord: city.coord})),
                windData: generateWindData(citiesWeatherData),
                rainData: generateRainData(citiesWeatherData),
                cloudData: generateCloudData(citiesWeatherData),
                temperatureData: generateTemperatureData(citiesWeatherData),
            }
        } else {
            return { message: "no data" }
        }
    }).catch(error => console.log(error));
}

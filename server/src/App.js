require('dotenv').config();
import fetch from "isomorphic-fetch";

import { generateWindData } from "./WindStatisticsGenerator.js";
import { generateCloudData } from "./CloudStatistics.js";
import { generateRainData } from "./RainStatisticsGenerator.js";

// import { outputFromAPI } from "./exampleOutput.js";


export function dataGetter() {
    //Europe
    const lonTopLeft = -13.280284;
    const latBottomLeft = 34.366111;
    const lonBottomRight = 41.532033;
    const latTopRight = 64.953791;

    return new Promise((resolve, reject) => {
        fetch(`https://api.openweathermap.org/data/2.5/box/city?bbox=${lonTopLeft},${latBottomLeft},${lonBottomRight},${latTopRight}&APPID=${process.env.API_KEY}`)
            .then(data => resolve(data.json()))
            .catch(error => reject(error))
    }).then(data => {
        const citiesWeatherData = data.list;
        generateWindData(citiesWeatherData);
        generateCloudData(citiesWeatherData);
        generateRainData(citiesWeatherData);
        return generateRainData(citiesWeatherData);
    }).catch(error => console.log(error));

    // const citiesWeatherData = outputFromAPI.list;
    // return generateWindData(citiesWeatherData);
    // generateCloudData(citiesWeatherData);
    // generateRainData(citiesWeatherData);
}

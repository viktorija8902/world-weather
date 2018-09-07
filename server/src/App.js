require('dotenv').config();
import fetch from "isomorphic-fetch";
import { generateWindData } from "./WindStatisticsGenerator.js";
import { generateCloudData } from "./CloudStatistics.js";
import { generateRainData } from "./RainStatisticsGenerator.js";

// import { outputFromAPI } from "./exampleOutput.js";

export function dataGetter() {
    //Europe
    const lonLeft = -13.280284;
    const latBottom = 34.366111;
    const lonRight = 41.532033;
    const latTop = 64.953791;

    return new Promise((resolve, reject) => {
        fetch(`https://api.openweathermap.org/data/2.5/box/city?bbox=${lonLeft},${latBottom},${lonRight},${latTop}&APPID=${process.env.API_KEY}`)
            .then(data => resolve(data.json()))
            .catch(error => reject(error))
    }).then(data => {
        const citiesWeatherData = data.list;
        // return { windData: generateWindData(citiesWeatherData)};
        // return { cloudData: generateCloudData(citiesWeatherData) };
        // return generateCloudData(citiesWeatherData);
        return  generateRainData(citiesWeatherData);
    }).catch(error => console.log(error));

    // const citiesWeatherData = outputFromAPI.list;
    // return generateWindData(citiesWeatherData);
    // generateCloudData(citiesWeatherData);
    // generateRainData(citiesWeatherData);
}

// dataGetter()

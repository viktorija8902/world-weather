require('dotenv').config();
import fetch from "isomorphic-fetch";
import { generateWindData } from "./WindStatisticsGenerator.js";
import { generateCloudData } from "./CloudStatistics.js";
import { generateRainData } from "./RainStatisticsGenerator.js";

function dataGetter() {
    //Europe
    const lonLeft = -13.280284;
    const latBottom = 34.366111;
    const lonRight = 41.532033;
    const latTop = 64.953791;

    let promise = new Promise((resolve, reject) => {
        fetch(`https://api.openweathermap.org/data/2.5/box/city?bbox=${lonLeft},${latBottom},${lonRight},${latTop}&APPID=${process.env.API_KEY}`)
            .then(data => resolve(data.json()))
            .catch(error => reject(error))
    });
    promise.then(data => {
        const citiesWeatherData = data.list;
        generateWindData(citiesWeatherData);
        generateCloudData(citiesWeatherData);
        generateRainData(citiesWeatherData);
    });
    promise.catch(error => console.log(error));
}

dataGetter()

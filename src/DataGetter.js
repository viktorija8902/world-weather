require('dotenv').config();
import axios from 'axios';
import { generateWindData } from "./WindStatisticsGenerator.js";
import { generateCloudData } from "./CloudStatistics.js";
import { generateRainData } from "./RainStatisticsGenerator.js";
import { generateTemperatureData } from "./TemperatureStatisticsGenerator.js";

export const dataGetter = ({ lonTopLeft, latBottomLeft, lonBottomRight, latTopRight }) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/box/city?bbox=${lonTopLeft},${latBottomLeft},${lonBottomRight},${latTopRight}&APPID=${process.env.API_KEY}`)
    .then(response => {
      const citiesWeatherData = response.data.list;
      if (citiesWeatherData && citiesWeatherData.length > 0) {
        return {
          cities: citiesWeatherData.map(city => ({ name: city.name, coord: city.coord })),
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

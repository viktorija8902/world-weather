require('dotenv').config();
import axios from 'axios';

import { MESSAGES } from "./Constants";
import { generateWindData } from "./WindStatisticsGenerator";
import { generateCloudData } from "./CloudStatistics";
import { generateRainData } from "./RainStatisticsGenerator";
import { generateTemperatureData } from "./TemperatureStatisticsGenerator";
import { getRegionFromCache, addRegionToCache } from "./RegionCache";
import { regionCoordList } from "./data/Regions";


export const predefinedDataGetter = (region) => {
  const regionDataInCache = getRegionFromCache(region);
  if (regionDataInCache) {
    return Promise.resolve(regionDataInCache);
  } else {
    const coordinates = regionCoordList[region];
    if (coordinates) {
      return dataGetter(coordinates).then(data => {
        addRegionToCache(region, data);
        return data;
      });
    } else {
      return Promise.resolve({ message: MESSAGES.NO_DATA });
    }
  }
}

export const dataGetter = ({ lonTopLeft, latBottomLeft, lonBottomRight, latTopRight }) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/box/city?bbox=${lonTopLeft},${latBottomLeft},${lonBottomRight},${latTopRight}&APPID=${process.env.API_KEY}`)
    .then(response => {
      const citiesWeatherData = response.data.list;
      if (citiesWeatherData && citiesWeatherData.length > 0) {
        return {
          output: {
            cities: citiesWeatherData.map(city => ({ id: city.id, name: city.name, coord: city.coord })),
            windData: generateWindData(citiesWeatherData),
            rainData: generateRainData(citiesWeatherData),
            cloudData: generateCloudData(citiesWeatherData),
            temperatureData: generateTemperatureData(citiesWeatherData),
          }
        }
      } else {
        return { output: {} };
      }
    })
}

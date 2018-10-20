require('dotenv').config();
import axios from 'axios';

import { MESSAGES } from "./Constants";
import { getWindType, metersPerSecondToKmPerHour } from "./WindStatisticsGenerator";
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
      const citiesWeatherData = sortBy(response.data.list, "name");
      if (citiesWeatherData && citiesWeatherData.length > 0) {
        const rainIdsStartWith = 5;
        return {
          output: {
            cities: citiesWeatherData.map(city => {
              const rain = city.weather.find(condition => condition.id.toString().startsWith(rainIdsStartWith));
              const rainDescription = rain ? {description: rain.description} : null;
              const windSpeed = metersPerSecondToKmPerHour(city.wind.speed);
              return  {
                id: city.id,
                name: city.name,
                coord: city.coord,
                wind: { 
                  speed: windSpeed,
                  type: getWindType(windSpeed),
                },
                clouds: city.clouds,
                rain: rainDescription,
                temperature: city.main.temp,
              }
            }),
          }
        }
      } else {
        return { output: {} };
      }
    })
}

function sortBy(data, key) {
  let arrayCopy = [...data];
  arrayCopy.sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });
  return arrayCopy;
}

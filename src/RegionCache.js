import NodeCache from "node-cache";
const regionCache = new NodeCache({ stdTTL: 60*30, checkperiod: 60*10 });

setInterval(() => {
  console.log(regionCache.keys());
}, 1000*60*30);

export const getRegionFromCache = (region) => regionCache.get(region);

export const addRegionToCache = (region, data) => regionCache.set(region, data);

export const extendTimeInRegionCache = (region) => regionCache.ttl(region, 60*30);

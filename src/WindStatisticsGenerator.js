import { WIND_SPEED } from "./Constants.js";


export const getWindType = (windSpeed) => {
	switch (true) {
		case (windSpeed < WIND_SPEED["LIGHT_WINDS"].max):
			return "LIGHT_WINDS";
		case (windSpeed >= WIND_SPEED["MODERATE_WINDS"].min && windSpeed <= WIND_SPEED["MODERATE_WINDS"].max):
			return "MODERATE_WINDS";
		case (windSpeed >= WIND_SPEED["STRONG_WIND_SMALL_CRAFT_WARNING"].min && windSpeed <= WIND_SPEED["STRONG_WIND_SMALL_CRAFT_WARNING"].max):
			return "STRONG_WIND_SMALL_CRAFT_WARNING";
		case (windSpeed >= WIND_SPEED["GALE_WARNING"].min && windSpeed <= WIND_SPEED["GALE_WARNING"].max):
			return "GALE_WARNING";
		case (windSpeed >= WIND_SPEED["STORM_WARNING"].min && windSpeed <= WIND_SPEED["STORM_WARNING"].max):
			return "STORM_WARNING";
		case (windSpeed >= WIND_SPEED["HURRICANE_FORCE_WIND_WARNING"].min):
			return "HURRICANE_FORCE_WIND_WARNING";
		default:
			console.log("Error when getting wind category: ", city);
	}
}

export const metersPerSecondToKmPerHour = (speed) => speed * 3.6;

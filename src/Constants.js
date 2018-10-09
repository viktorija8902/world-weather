//winds in knots
export const WIND_SPEED = {
    LIGHT_WINDS: {
        min: 0,
        max: 12
    },
    MODERATE_WINDS: {
        min: 12,
        max: 19
    },
    STRONG_WIND_SMALL_CRAFT_WARNING: {
        min: 19,
        max: 33
    },
    GALE_WARNING: {
        min: 33,
        max: 47
    },
    STORM_WARNING: {
        min: 47,
        max: 63
    },
    HURRICANE_FORCE_WIND_WARNING: {
        min: 63,
        max: null
    }
}

//temperature in celsius
export const HEAT = {
    FRIGID: { min: -9999, max: -9 },
    FREEZING: { min: -9, max: 0 },
    VERY_COLD: { min: 0, max: 7 },
    COLD: { min: 7, max: 13 },
    COOL: { min: 13, max: 18 },
    COMFORTABLE: { min: 18, max: 24 },
    WARM: { min: 24, max: 29 },
    HOT: { min: 29, max: 35 },
    SWELTERING: { min: 35, max: 9999 }
}

export const MESSAGES = {
    NO_DATA: "no data",
}
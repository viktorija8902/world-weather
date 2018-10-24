//winds in km/h (converted from knots: knots * 1.852)
export const WIND_SPEED = {
    LIGHT_WINDS: {
        min: 0,
        max: 22.224 //12 knots
    },
    MODERATE_WINDS: {
        min: 22.224,
        max: 35.188 //19 knots
    },
    STRONG_WIND_SMALL_CRAFT_WARNING: {
        min: 35.188,
        max: 61.116 //33 knots
    },
    GALE_WARNING: {
        min: 61.116,
        max: 87.04400000000001 //47 knots
    },
    STORM_WARNING: {
        min: 87.04400000000001,
        max: 116.676 //63 knots
    },
    HURRICANE_FORCE_WIND_WARNING: {
        min: 116.676,
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

export const MESSAGE = {
    ERROR: "error",
}

// Structure of data that comes back from vision api as an array of predictions objects
export interface Prediction {
    boundingBox: {
        height: number,
        left: number,
        top: number,
        width: number,
    },
    probability: number,
    tagId: string,
    tagName: string
}

// Colour obj used to count total colours on cards in image
export interface ColourObj {
    colour_Black: number,
    colour_DarkBlue: number,
    colour_LightBlue: number,
    colour_LightGreen: number,
    colour_LightGrey: number,
    colour_LightOrange: number,
    colour_LightPink: number,
    colour_Orange: number,
    colour_Purple: number,
    colour_White: number,
    colour_Yellow: number,
}
// Symbol obj used to count total symbols on cards in image
export interface SymbolObj {
    symbol_Anchor: number,
    symbol_Boat: number,
    symbol_Crab: number,
    symbol_Fish: number,
    symbol_Mermaid: number,
    symbol_Octopus: number,
    symbol_Penguin: number,
    symbol_Shark: number,
    symbol_Shell: number,
    symbol_Swimmer: number
}
// Multiplyer obj used to count total multiplyer cards in image
export interface MultiplyerObj {
    multiplyer_Anchor: number,
    multiplyer_Boat: number,
    multiplyer_Fish: number,
    multiplyer_Penguin: number,
}
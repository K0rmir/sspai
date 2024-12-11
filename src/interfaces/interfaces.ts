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
    colour_black: number,
    colour_darkBlue: number,
    colour_lightBlue: number,
    colour_lightGreen: number,
    colour_lightGrey: number,
    colour_lightOrange: number,
    colour_lightPink: number,
    colour_orange: number,
    colour_purple: number,
    colour_white: number,
    colour_yellow: number,
}
// Symbol obj used to count total symbols on cards in image
export interface SymbolObj {
    symbol_anchor: number,
    symbol_boat: number,
    symbol_crab: number,
    symbol_fish: number,
    symbol_mermaid: number,
    symbol_octopus: number,
    symbol_penguin: number,
    symbol_shark: number,
    symbol_shell: number,
    symbol_swimmer: number
}
// Multiplyer obj used to count total multiplyer cards in image
export interface MultiplyerObj {
    multiplier_anchor: number,
    multiplier_boat: number,
    multiplier_fish: number,
    multiplier_penguin: number,
}

export type CollectorCard = Pick<SymbolObj, "symbol_octopus" | "symbol_penguin" | "symbol_shell" | "symbol_anchor">
export type CardPair = Omit<SymbolObj, "symbol_octopus" | "symbol_penguin" | "symbol_shell" | "symbol_anchor" | "symbol_mermaid">
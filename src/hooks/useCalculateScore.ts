import { ColourObj, SymbolObj, MultiplyerObj, Prediction } from '@/interfaces/interfaces'


// Hook to encapsulate all logic pertaining to calculating the overall score found in players hand.

export const useCalculateScore = (preditionData: Prediction[]): number => {

    // Initialise the three main objects we'll need to track how many of each card are present. 
    const colourObj: ColourObj = {
        colour_black: 0,
        colour_darkBlue: 0,
        colour_lightBlue: 0,
        colour_lightGreen: 0,
        colour_lightGrey: 0,
        colour_lightOrange: 0,
        colour_lightPink: 0,
        colour_orange: 0,
        colour_purple: 0,
        colour_white: 0,
        colour_yellow: 0,
    }

    const symbolObj: SymbolObj = {
        symbol_anchor: 0,
        symbol_boat: 0,
        symbol_crab: 0,
        symbol_fish: 0,
        symbol_mermaid: 0,
        symbol_octopus: 0,
        symbol_penguin: 0,
        symbol_shark: 0,
        symbol_shell: 0,
        symbol_swimmer: 0
    }

    const multiplyerObj: MultiplyerObj = {
        multiplyer_anchor: 0,
        multiplyer_boat: 0,
        multiplyer_fish: 0,
        multiplyer_penguin: 0,
    }

    // First count how many symbol are present. We do this first to assert whether or not there are any mermaid symbols present. If there are not, we don't need to count colours. 

    preditionData.forEach((prediction: Prediction) => {
        if (prediction.tagName.includes('symbol')) {
            const symbolName = prediction.tagName.split('-')[1]
            countSymbol(symbolName)
        } else if (prediction.tagName.includes('multiplyer')) {
            countMultiplyer(prediction.tagName)
        }
    })

    function countSymbol(symbolName: string) {
        const matchingKey = Object.keys(symbolObj).find((key) => key.includes(symbolName)) as keyof SymbolObj

        if (matchingKey) {
            symbolObj[matchingKey]++;
        }
    }

    function countMultiplyer(multiplyerName: string) {

    }




}
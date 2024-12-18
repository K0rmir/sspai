import {
    CardPair,
    CollectorCard,
    ColourObj,
    MultiplyerObj,
    Prediction,
    SymbolObj,
} from '@/interfaces/interfaces';

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
    };

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
        symbol_swimmer: 0,
    };

    const multiplierObj: MultiplyerObj = {
        multiplier_anchor: 0,
        multiplier_boat: 0,
        multiplier_fish: 0,
        multiplier_penguin: 0,
    };

    // First count how many symbols and multiplyers are present.

    preditionData.forEach((prediction: Prediction) => {
        const symbolName = prediction.tagName.split('-')[1];
        if (prediction.tagName.includes('symbol')) {
            countSymbol(symbolName);
        } else if (prediction.tagName.includes('multiplier')) {
            countMultiplyer(symbolName);
        }
    });

    // Helper function to count total symbols in hand
    function countSymbol(symbolName: string) {
        const matchingKey = Object.keys(symbolObj).find((key) =>
            key.includes(symbolName)
        ) as keyof SymbolObj;

        if (matchingKey) {
            symbolObj[matchingKey]++;
        }
    }
    // Helper function to count total multiplyer cards in hand
    function countMultiplyer(multiplyerName: string) {
        const matchingKey = Object.keys(multiplierObj).find((key) =>
            key.includes(multiplyerName)
        ) as keyof MultiplyerObj;

        if (matchingKey) {
            multiplierObj[matchingKey]++;
        }
    }

    // Once all counting is done, check if mermaid count is 1 or greater and if so, filter array by colours and call count colours on each
    if (symbolObj.symbol_mermaid >= 1) {
        const coloursArr = preditionData.filter((prediction: Prediction) =>
            prediction.tagName.includes('colour')
        );
        coloursArr.forEach((prediction: Prediction) => {
            const colourName = prediction.tagName.split('-')[1];
            countColours(colourName);
        });
    }

    // Helper function to count total colours of cards in hand
    function countColours(colourName: string) {
        const matchingKey = Object.keys(colourObj).find((key) =>
            key.includes(colourName)
        ) as keyof ColourObj;

        if (matchingKey) {
            colourObj[matchingKey]++;
        }
    }

    // Next begin calculating score

    let totalScore: number = 0;

    // First calculate points for pairs of cards. Boats / Fish / Crabs / Shark / Swimmers.

    // TODO : Work out how to calculate score for shark / swimmer pairs

    const cardPairs: (keyof CardPair)[] = [
        'symbol_boat',
        'symbol_fish',
        'symbol_crab',
        'symbol_shark',
        'symbol_swimmer',
    ];
    // Find total amount of relevant card pairs
    const totalCardPairs = Object.entries(symbolObj).reduce((sum, [key, value]): number => {
        if (cardPairs.includes(key as keyof CardPair)) {
            return sum + value;
        }
        return sum;
    }, 0);

    // Divide by 2 and round down as each pair is worth 1 point. If there is an odd number in hand, this won't matter as it doesn't score.
    const cardPairPoints = Math.floor(totalCardPairs / 2);

    totalScore += cardPairPoints;

    // Next calculate multiplyer cards.

    let multipliedValue;

    // Filter out any multiplyer cards where value is 0
    const filterMultiplierCards = (cards: MultiplyerObj, valueToMatch: number) => {
        return Object.fromEntries(
            Object.entries(multiplierObj).filter(([_, valueToMatch]) => valueToMatch)
        );
    };

    const filteredMultiplierCards = filterMultiplierCards(multiplierObj, 1);

    Object.keys(filteredMultiplierCards).map((key) => {
        if (key === 'multiplier_anchor') {
            multipliedValue = symbolObj.symbol_anchor * 3;
            totalScore += multipliedValue;
            console.log('Anchor Multiplied Value =', multipliedValue);
        } else if (key === 'multiplier_boat') {
            multipliedValue = symbolObj.symbol_boat * 1;
            totalScore += multipliedValue;
            console.log('Boat Multiplied Value =', multipliedValue);
        } else if (key === 'multiplier_fish') {
            multipliedValue = symbolObj.symbol_fish * 1;
            totalScore += multipliedValue;
            console.log('Fish Multiplied Value =', multipliedValue);
        } else if (key === 'multiplier_penguin') {
            multipliedValue = symbolObj.symbol_penguin * 2;
            totalScore += multipliedValue;
            console.log('Penguin Multiplied Value =', multipliedValue);
        }
    });

    return totalScore;
};

// instead of instanciating an full object for each symbol, colour etc, could instead loop through original prediction data and create objects from there. Would need to make types optional as they won't all always be complete.
// This could then reduce the amount of filtering I would need to do.

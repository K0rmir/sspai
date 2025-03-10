import {
    Prediction,
} from '@/interfaces/interfaces';

// Hook to encapsulate all logic pertaining to calculating the overall score found in players hand.

export const useCalculateScore = (predictionData: Prediction[]): number => {

    let predictedScore: number = 0;

    // v Object.groupBy is freaking GOATED
    const symbolPredictions = Object.groupBy(predictionData.filter(prediction => prediction.tagName.includes("symbol")), (prediction: Prediction) => prediction.tagName)
    const multiplierPredictions = Object.groupBy(predictionData.filter(prediction => prediction.tagName.includes("multiplier")), (prediction: Prediction) => prediction.tagName)

    // Count pairs & collector cards & add to total score

    Object.entries(symbolPredictions).forEach(([key, value]) => {
        if (value) {
            switch (key) {
                case "symbol-crab":
                case "symbol-boat":
                case "symbol-fish":
                    predictedScore += Math.floor(value.length / 2)
                    break;
                case "symbol-anchor":
                    predictedScore += (value.length * 5) - 5
                    break;
                case "symbol-octopus":
                    predictedScore += (value.length * 3) - 3
                    break;
                case "symbol-penguin":
                    predictedScore += (value.length * 2) - 1
                    break;
                case "symbol-shell":
                    predictedScore += (value.length * 2) - 2
                    break;
            }
        }
    })

    if (symbolPredictions["symbol-shark"] && symbolPredictions["symbol-swimmer"]) {
        const sharkSwimmerPairs = Math.min(symbolPredictions["symbol-shark"].length, symbolPredictions["symbol-swimmer"].length)
        predictedScore += sharkSwimmerPairs
    }

    // Calculate any multiplier cards if they are present and add to total score 

    if (Object.keys(multiplierPredictions).length > 0) {
        Object.keys(multiplierPredictions).forEach((key) => {
            switch (key) {
                case "multiplier-anchor":
                    predictedScore += (symbolPredictions["symbol-anchor"]?.length ?? 0) * 3
                    break;
                case "multiplier-boat":
                case "multiplier-fish": {
                    const splitKey = key.split("-")[1]
                    predictedScore += symbolPredictions[`symbol-${splitKey}`]?.length ?? 0
                }
                    break;
                case "multiplier-penguin":
                    predictedScore += (symbolPredictions["symbol-penguin"]?.length ?? 0) * 2
            }
        })
    }

    // Calculate colour bonus if 1 or more mermaid cards are present

    if (symbolPredictions["symbol-mermaid"]) {
        const colourPredictions = Object.groupBy(predictionData.filter(prediction => prediction.tagName.includes("colour")), (prediction: Prediction) => prediction.tagName)
        const mermaidCount = symbolPredictions["symbol-mermaid"].length
        const colourQuantities = Object.values(colourPredictions).map(colour => colour?.length ?? 0).sort((a, b) => b - a)

        for (let i = 0; i < mermaidCount; i++) {
            predictedScore += colourQuantities[i]
        }
    }

    return predictedScore;
};

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

export type PlayerNum = "playerOne" | "playerTwo" | "playerThree" | "playerFour"

export type Player = {
    name: string,
    totalScore: number,
}

export type PlayerInfo = {
    playerOne: Player,
    playerTwo: Player,
    playerThree: Player,
    playerFour: Player,
}
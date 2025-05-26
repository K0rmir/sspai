import {create} from "zustand"
import { PlayerInfo} from '@/interfaces/interfaces';

type GameStoreState = {
    playerInfo: PlayerInfo,
    totalGameScore: number,
    playerNum: number,
    gameCreated: boolean,
    gameOver: boolean,
    predictedScoreInStore: { key: string; score: number } | null,
    gameHistory: boolean,
}

type GameStoreActions = {
    setTotalGameScore: (score: number) => void,
    setPlayerNum: (num: number) => void,
    setGameCreated: () => void,
    setGameOver: () => void,
    createPlayers: (names: string[]) => void,
    updatePlayerScores: (scores: Record<keyof PlayerInfo, number>) => void,
    setPredictedScoreInStore: (key: string, score: number) => void,
    clearPredictedScore: () => void,
    setGameHistory: () => void
    resetGameState: () => void
}

// Overall not a fan of having a predicted score in the store which is the same value as predicted score in the Visual Scorer component. 
// Variable names are too similar and it doesn't feel right having local/store versions of the same value. But it works for now.

const playerKeys = ["playerOne", "playerTwo", "playerThree", "playerFour"]

const initialState: GameStoreState = {
    playerInfo: {
        playerOne: {name: "", totalScore: 0},
        playerTwo: {name: "", totalScore: 0},
        playerThree: {name: "", totalScore: 0},
        playerFour: {name: "", totalScore: 0},
    },
    playerNum: 2,
    totalGameScore: 40,
    gameCreated: false,
    gameOver: false,  
    predictedScoreInStore: null,  
    gameHistory: false,

}

export const gameStore= create<GameStoreState & GameStoreActions>((set) => {

    return {
        ...initialState,       
        setTotalGameScore: (score) => set(() => ({ totalGameScore: score })),     
        setGameCreated: () => set((state) => ({gameCreated: !state.gameCreated})),    
        setGameOver: () => set((state) => ({gameOver: !state.gameOver})),
        setPlayerNum: (num) => set(() => ({ playerNum: num})),
        createPlayers: (names) => set(() => ({
            playerInfo: names.reduce((acc, name, i) => {
                const key = playerKeys[i] as keyof PlayerInfo
                acc[key] = { name, totalScore: 0 }
                return acc
            }, {} as PlayerInfo)
        })),
        updatePlayerScores: (scores) => set((state) => ({
            playerInfo: Object.entries((scores)).reduce((acc, [key,roundScore]) => {
                const playerInfoKey = key as keyof PlayerInfo
                acc[playerInfoKey] = { ...state.playerInfo[playerInfoKey], totalScore: state.playerInfo[playerInfoKey].totalScore + roundScore}
                return acc
            },{} as PlayerInfo)
            
        })),
        setPredictedScoreInStore: (key, score) =>
            set(() => ({
            predictedScoreInStore: { key, score },
            })),
        clearPredictedScore: () => set({ predictedScoreInStore: null }),
        setGameHistory: () => set((state) => ({ gameHistory: !state.gameHistory})),
        resetGameState: () => set(initialState)
    }
})
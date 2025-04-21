import {create} from "zustand"
import { PlayerInfo} from '@/interfaces/interfaces';

type GameStore = {
    playerInfo: PlayerInfo,
    totalGameScore: number,
    setTotalGameScore: (score: number) => void,
    playerNum: number,
    setPlayerNum: (num: number) => void
    gameCreated: boolean,
    setGameCreated: () => void
    gameOver: boolean,
    setGameOver: () => void
    createPlayers: (names: string[]) => void
    updatePlayerScores: (scores: Record<keyof PlayerInfo, number>) => void

}

const playerKeys = ["playerOne", "playerTwo", "playerThree", "playerFour"]

export const gameStore= create<GameStore>((set) => {

    return {
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

        

    }






    

})
import { GameRecord } from '@/interfaces/interfaces';

// Custom hook to retrieve game records from local storage 

type GameHistoryRecord = [string, GameRecord]


export const UseGameHistory = (): GameHistoryRecord[] => {
    const storageKey = "ssp-scorer"
    const rawGameRecords = localStorage.getItem(storageKey)

    const parsedGameRecords = rawGameRecords === null ? "" : (JSON.parse(rawGameRecords) as Record<string, GameRecord>)

    // return game records sorted by their ID, most recent first
    return Object.entries(parsedGameRecords).sort((a, b) => splitGameId(b[0]) - splitGameId(a[0]))
}

// helper function to easier sort game records by gameId
const splitGameId = (idStr: string) => {
    return parseInt(idStr.split("-")[1], 10)
}
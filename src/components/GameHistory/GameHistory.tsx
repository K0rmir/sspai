import { FC } from 'react';
import { GameCard } from './GameCard';
import { GameRecord } from '@/interfaces/interfaces';
import { Stack } from '@mantine/core';

export const GameHistory: FC = () => {

    const storageKey = "ssp-scorer"
    const rawGameRecords = localStorage.getItem(storageKey)
    // TODO: Add error message / fallback render here if no records can be found
    const parsedGameRecords = rawGameRecords ? (JSON.parse(rawGameRecords) as Record<string, GameRecord>) : {} 


    console.log(Object.entries(parsedGameRecords))

    return (
        <Stack align="center">
        {Object.entries(parsedGameRecords).map(([gameId, gameRecord]) => {
            return (<GameCard key={gameId} gameRecord={gameRecord}/>)
        })}
        </Stack>
    )

}
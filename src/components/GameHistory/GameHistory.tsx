import { FC } from 'react';
import { GameCard } from './GameCard';
import { GameRecord } from '@/interfaces/interfaces';
import { Stack, ScrollArea, Text } from '@mantine/core';

export const GameHistory: FC = () => {

    const storageKey = "ssp-scorer"
    const rawGameRecords = localStorage.getItem(storageKey) 

    const parsedGameRecords = rawGameRecords === null ? "" : (JSON.parse(rawGameRecords) as Record<string, GameRecord>)

    const sortedGameRecords = Object.entries(parsedGameRecords).sort((a, b) => splitGameId(b[0]) - splitGameId(a[0]))

    return (

        sortedGameRecords.length >= 1 ? (
            
        <ScrollArea h={750}>
        <Stack align="center">
        {sortedGameRecords.map(([gameId, gameRecord]) => {
            return (<GameCard key={gameId} gameRecord={gameRecord}/>)
        })}
        </Stack>
        </ScrollArea>
        ) : (<Stack align="center" justify='center'>
            <Text fw={700}>
            Uh oh! No saved games found...
            </Text>
            <Text fw={700}>
            Why not gather some friends and play?
            </Text>
        </Stack>)



    ) 

}

const splitGameId = (idStr: string) => {
    return parseInt(idStr.split("-")[1], 10)
}
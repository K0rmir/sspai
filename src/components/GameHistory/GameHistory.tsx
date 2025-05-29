import { FC } from 'react';
import { GameCard } from './GameCard';
// import { GameRecord } from '@/interfaces/interfaces';
import { UseGameHistory } from '@/hooks/UseGameHistory';
import { Stack, ScrollArea, Text } from '@mantine/core';

export const GameHistory: FC = () => {

    const gameRecords = UseGameHistory()

    return (

        gameRecords.length >= 1 ? (
            
        <ScrollArea h={750}>
        <Stack align="center">
        {gameRecords.map(([gameId, gameRecord]) => {
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

import { FC } from 'react';
import { Group } from '@mantine/core';
import  VisualScorer  from "@/components/VisualScorer/VisualScorer"
import { GameHistory } from './HeaderButtons/GameHistory';
import { gameStore } from '@/store/GameStore';

export const Header: FC = () => {

    const { gameCreated } = gameStore()

    // Game creation view - History button
    // Game started / in progress - Visual scorer button
    // Game over view - History button

    return (
        <Group justify="center">
            {gameCreated && (
                <VisualScorer   />
            )}
            {!gameCreated && (
                <GameHistory/>
            )}
           
           
           
        </Group>
    )

}
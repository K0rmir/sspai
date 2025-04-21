import { FC } from 'react';
import { Group, Button, px } from '@mantine/core';
import  VisualScorer  from "@/components/VisualScorer/VisualScorer"
import { gameStore } from '@/store/GameStore';

export const Header: FC = () => {

    const { gameCreated, setGameHistory } = gameStore()

    return (
        <Group justify="center" mb={15}>
            {gameCreated && (
                <VisualScorer   />
            )}
            {!gameCreated && (
                <Button onClick={() => setGameHistory()}>Game History</Button>
            )}
        </Group>
    )

}
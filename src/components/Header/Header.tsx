import { FC } from 'react';
import { Group, Button } from '@mantine/core';
import  VisualScorer  from "@/components/VisualScorer/VisualScorer"
import { gameStore } from '@/store/GameStore';

export const Header: FC = () => {

    const { gameCreated } = gameStore()

    return (
        <Group justify="center" p={25}>
            {gameCreated ? (
                <VisualScorer   />
            ) : ( <HeaderButtons /> )}
            
        </Group>
    )

}

const HeaderButtons: FC = () => {
    const { setGameHistory, gameHistory, gameOver, resetGameState } = gameStore()
    return (
        <Group>
            {!gameOver ? (<Button onClick={() => setGameHistory()}>{gameHistory ? "Create New Game" : "Game History"}</Button>) : (<Button onClick={() => resetGameState()}>Create New Game</Button>)}
            
            {gameHistory && (<Button onClick={() => console.log("Games Exported")} >Export Games</Button> )}
            
        </Group>
    )
}
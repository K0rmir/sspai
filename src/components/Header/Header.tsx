import { FC } from 'react';
import { Group, Button } from '@mantine/core';
import  VisualScorer  from "@/components/VisualScorer/VisualScorer"
import { UseGameHistory } from '@/hooks/UseGameHistory';
import { gameStore } from '@/store/GameStore';
import { CSVLink } from "react-csv"; 
import  {Player} from '@/interfaces/interfaces';


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

    const headers = [
        {label: "Game ID", key: "gameId"},
        {label: "Date", key: "gameDate" },
        {label: "Player Name", key: "name"},
        {label: "Score", key: "totalScore" },
    ]

    return (
        <Group>
            {!gameOver ? (<Button onClick={() => setGameHistory()}>{gameHistory ? "Create New Game" : "Game History"}</Button>) : (<Button onClick={() => resetGameState()}>Create New Game</Button>)}
            
            {gameHistory && (
            <CSVLink data={exportGameData()} headers={headers}><Button>Export Games</Button></CSVLink>
        )} 
        </Group>
    )
}


const exportGameData = () => {

    const gameRecords = UseGameHistory()

    const data = gameRecords.flatMap(([gameId, record]) => {
        const {gameDate, playerInfo } = record

        return Object.values(playerInfo).map((player: Player) => ({
            gameId,
            gameDate,
            name: player.name,
            totalScore: player.totalScore
        }))
    })

    return data
}
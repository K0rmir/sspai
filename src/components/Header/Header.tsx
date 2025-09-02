import { FC } from 'react';
import { Group, Button } from '@mantine/core';
import  VisualScorer  from "@/components/VisualScorer/VisualScorer"
import {GameHistoryRecord, UseGameHistory} from '@/hooks/UseGameHistory';
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
    const { toggleGameHistory, gameHistoryToggle, gameOver, resetGameState } = gameStore()
    const gameRecords = UseGameHistory()

    const headers = [
        {label: "Game ID", key: "gameId"},
        {label: "Date", key: "gameDate" },
        {label: "Player Name", key: "name"},
        {label: "Score", key: "totalScore" },
    ]

    return (
        <Group>
            {!gameOver ? (<Button onClick={() => toggleGameHistory()}>{gameHistoryToggle ? "Create New Game" : "Game History"}</Button>) : (<Button onClick={() => resetGameState()}>Create New Game</Button>)}

            {gameRecords.length > 0 && (
            <CSVLink data={exportGameData(gameRecords)} headers={headers} filename="ssp-game-history-export"><Button>Export Games</Button></CSVLink>
        )}
        </Group>
    )
}


const exportGameData = (gameRecords: GameHistoryRecord[]) => {

    return gameRecords.flatMap(([gameId, record]) => {
        const {gameDate, playerInfo } = record

        return Object.values(playerInfo).map((player: Player) => ({
            gameId,
            gameDate,
            name: player.name,
            totalScore: player.totalScore
        }))
    })
}
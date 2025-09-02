import { PlayerInfo, GameRecord } from '@/interfaces/interfaces';
import { Text, Badge, Avatar, Stack, Button } from '@mantine/core';
import styles from "./GameOver.module.css";
import genericStyles from "@/components/GenericStyles.module.css";
import { FC } from 'react';
import { gameStore } from '@/store/GameStore';

type GameOverProps = {
    playerInfo: PlayerInfo;
  };

type FinalScoreCardProps = {
    name?: string | undefined,
    totalScore: number,
    winner?: boolean
}

 const FinalScoreCard: FC<FinalScoreCardProps> = ({ name, totalScore, winner }) => {
    return (
        <div className={styles.finalScoreCard}>
            <div className={styles.content}>
                <Avatar radius="xl" className={`${styles.avatar} ${winner ? styles.winnerAvatar : ''}`} />
                <Text className={styles.name} size='xl'>{name}</Text>
                <Badge className={`${styles.scoreBadge} ${winner ? styles.winner : ''}`}>{totalScore}</Badge>
            </div>
        </div>
    )
}

// TODO: Add winner field to playerInfo data when saving game to make it easier to display who won when viewing history

const GameOver: FC<GameOverProps> = ({playerInfo}) => {

    const {  gameHistoryToggle } = gameStore()

    const highestScore = Math.max(...Object.values(playerInfo).map((player) => player.totalScore))

    return (
        !gameHistoryToggle && (
            <Stack justify='center' align='center' >
            <Text fw={700} mt={35} size='xl' className={genericStyles.header}>Final Scores</Text>

        {Object.values(playerInfo).map((player) => {

            const isWinner = player.totalScore === highestScore
            return (<FinalScoreCard name={player.name} totalScore={player.totalScore} winner={isWinner}/>)
        })}
        <SaveGameButton playerInfo={playerInfo}/>
       </Stack>
        ))}

const SaveGameButton = ({playerInfo}: {playerInfo: PlayerInfo}) => {
    const { toggleGameHistory } = gameStore()

    const saveGame = () => {
        const storageKey = "ssp-scorer"
        const gameDate = new Date().toLocaleDateString()
        const gameData: GameRecord = {gameDate, playerInfo}

        const gameId = `game-${Date.now()}`

        // retrieve and parse existing game data from local storage

        const existingRaw = localStorage.getItem(storageKey)
        const existingData = existingRaw ? JSON.parse(existingRaw) : {}

        // spread existing data and add new game to it
        const updatedData = {
            ...existingData,
            [gameId]: gameData
        }

        localStorage.setItem(storageKey, JSON.stringify(updatedData))
        toggleGameHistory()

    }


    return (
        <Button onClick={() => saveGame()}>Save Game</Button>
    )
}



export default GameOver
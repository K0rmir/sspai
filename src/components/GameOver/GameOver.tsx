import { PlayerInfo } from '@/interfaces/interfaces';
import { Text, Badge, Avatar, Stack } from '@mantine/core';
import styles from "./GameOver.module.css";
import genericStyles from "@/components/GenericStyles.module.css";
import { FC } from 'react';

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

const GameOver: FC<GameOverProps> = ({playerInfo}) => {

    const highestScore = Math.max(...Object.values(playerInfo).map((player) => player.totalScore))

    return (
         <Stack justify='center' align='center' >
            <Text fw={700} mt={35} size='xl' className={genericStyles.header}>Final Scores</Text>

        {Object.values(playerInfo).map((player) => {

            const isWinner = player.totalScore === highestScore
            return (<FinalScoreCard name={player.name} totalScore={player.totalScore} winner={isWinner}/>)
        })}
       </Stack>
       
    )

}

export default GameOver
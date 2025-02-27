import { PlayerInfo } from '@/interfaces/interfaces';
import { Text, Badge, Avatar, Stack } from '@mantine/core';
import styles from "./GameOver.module.css";
import genericStyles from "@/components/GenericStyles.module.css";
import { FC } from 'react';

type GameOverProps = {
    playerInfo: PlayerInfo;
  };

type FinalScoreCardProps = {
    name: string,
    totalScore: number,
}

 const FinalScoreCard: FC<FinalScoreCardProps> = ({ name, totalScore }) => {
    return (
        <div className={styles.finalScoreCard}>
            <div className={styles.content}>
                <Avatar  radius="xl" name={name[0]} className={styles.avatar} />
                <Text className={styles.name} size='xl'>{name}</Text>
                <Badge className={styles.scoreBadge}>{totalScore}</Badge>
            </div>
        </div>
    )
}

const GameOver: FC<GameOverProps> = ({playerInfo}) => {

    console.log("players info in game over =", playerInfo)



    return (
         <Stack justify='center' align='center' >
            <Text fw={700} mt={35} size='xl' className={genericStyles.header}>Final Scores</Text>
        {Object.values(playerInfo).map((player) => {
            return (<FinalScoreCard name={player.name} totalScore={player.totalScore} />)
        })}
       </Stack>
       
    )

}

export default GameOver
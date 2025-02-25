import { FC } from "react"
import { Text, NumberInput, Badge, Avatar } from '@mantine/core';
import styles from "./PlayerCard.module.css";

type PlayerCardProps = {
    name: string;
    totalScore: number,
    inputProps: {
        value?: number | string,
        onChange: (value: number | string) => void;
    }
}

export const PlayerCard: FC<PlayerCardProps> = ({ name, totalScore, inputProps }) => {
    return (
        <div className={styles.playerCard}>
            <div className={styles.header}>
                <Avatar  radius="xl" name={name[0]} className={styles.avatar} />
                <Text className={styles.name}>{name}</Text>
                <Badge className={styles.scoreBadge}>{totalScore}</Badge>
            </div>
        <div className={styles.controls}>
            <NumberInput className={styles.scoreInput} {...inputProps} radius="lg" hideControls   />
        </div>

        </div>
    )
}
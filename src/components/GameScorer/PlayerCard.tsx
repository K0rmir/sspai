import { FC } from "react"
import { Text, NumberInput, Badge, Avatar } from '@mantine/core';
import styles from "./PlayerCard.module.css";

type PlayerCardProps = {
    name: string | undefined;
    totalScore: number,
    inputProps: {
        value?: number | string,
        onChange: (value: number | string) => void;
    }
}

// TODO: Add images to avatar

export const PlayerCard: FC<PlayerCardProps> = ({ name, totalScore, inputProps }) => {

    return (
        <div className={styles.playerCard}>
            <div className={styles.header}>
                <Avatar  radius="xl" className={styles.avatar} />
                <Text className={styles.name}>{name}</Text>
                <Badge className={styles.scoreBadge}>{totalScore}</Badge>
            </div>
        <div className={styles.controls}>
            <NumberInput className={styles.scoreInput} radius="lg" hideControls value="" {...inputProps}  />
        </div>

        </div>
    )
}
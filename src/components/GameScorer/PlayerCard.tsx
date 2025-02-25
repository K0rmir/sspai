import { FC } from "react"
import { Group, Text, NumberInput, Card } from '@mantine/core';

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
        <>
        <Card shadow="sm" radius="md" withBorder>
            <Group>
                <Text>{name}</Text>
                <Text>{totalScore}</Text>
            </Group>
            <NumberInput {...inputProps} radius="lg" style={{width: 100}}   />
        </Card>

        </>
    )
}
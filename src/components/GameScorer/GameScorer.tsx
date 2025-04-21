import { FC} from 'react';
import { PlayerInfo } from '@/interfaces/interfaces';
import { Button, Text, Stack, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { PlayerCard } from '@/components/GameScorer/PlayerCard';
import genericStyles from "@/components/GenericStyles.module.css";
import  VisualScorer  from "@/components/VisualScorer/VisualScorer"
import {gameStore} from "@/store/GameStore"

const GameScorer: FC = () => {

    const {playerInfo, playerNum, totalGameScore, updatePlayerScores, setGameOver} = gameStore()

    const initialRoundScores = Object.entries(playerInfo).reduce((acc, [key]) => {
        acc[key as keyof PlayerInfo] = 0
        return acc
    }, {} as Record<keyof PlayerInfo, number>)

    const form = useForm({
        initialValues: initialRoundScores
    })

    const handleSubmit = (values: typeof form.values) => {

        updatePlayerScores(values)

        if (Object.values((playerInfo)).some((player) => player.totalScore >= totalGameScore  )) {
            setGameOver()
        } else {
            form.reset()
        }      
    }

    // Function used to update predicted score from visual scorer
     const updatePlayerScoreField = (playerKey: string, predicatedScore: number) => {
        const validKeys = ['playerOne', 'playerTwo', 'playerThree', 'playerFour']

        if (validKeys.includes(playerKey)) {
            form.setFieldValue(playerKey, predicatedScore)
        } else {
            console.error(`Invalid player key: ${playerKey}`);
        }
    }

    return (
        <Stack align='center' justify='center'>
            <Text fw={700} mt={35} size='xl' className={genericStyles.header}>Points needed to win: {totalGameScore}</Text>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <PlayerCard name={playerInfo.playerOne.name} totalScore={playerInfo.playerOne.totalScore} inputProps={form.getInputProps("playerOne")}  />
                <PlayerCard name={playerInfo.playerTwo.name}  totalScore={playerInfo.playerTwo.totalScore} inputProps={form.getInputProps("playerTwo")} />
                {playerNum === 3 && <PlayerCard name={playerInfo.playerThree.name}  totalScore={playerInfo.playerThree.totalScore} inputProps={form.getInputProps("playerThree")} />}
                {playerNum === 4 && (
                    <>
                    <PlayerCard name={playerInfo.playerThree.name}  totalScore={playerInfo.playerThree.totalScore} inputProps={form.getInputProps("playerThree")} />
                    <PlayerCard name={playerInfo.playerFour.name}  totalScore={playerInfo.playerFour.totalScore} inputProps={form.getInputProps("playerFour")} />
                    </>
                    )}
                <Group justify='center' >
                    <Button type='submit' color='#b12a74' size='lg'>Update Scores</Button>
                </Group>
                <Group justify='center' mt={50}>
                        <VisualScorer playerInfo={playerInfo} updatePlayerScoreField={updatePlayerScoreField} />
                    </Group>
                

            </form>
        </Stack>
    )
}



export default GameScorer
import { Dispatch, FC, SetStateAction } from 'react';
import { PlayerInfo } from '@/interfaces/interfaces';
import { Button, Text, Stack, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { PlayerCard } from '@/components/GameScorer/PlayerCard';
import genericStyles from "@/components/GenericStyles.module.css";
import { VisualScorer } from '@/components/VisualScorer/VisualScorer';

type GameScorerProps = {
    playerNum: number,
    gameScore: number,
    playerInfo: PlayerInfo,
    setPlayerInfo: Dispatch<SetStateAction<PlayerInfo>>
    setGameOver: Dispatch<SetStateAction<boolean>>
}

const GameScorer: FC<GameScorerProps> = ({playerNum, gameScore, playerInfo, setPlayerInfo, setGameOver}) => {

    const form = useForm({
        initialValues: {
            playerOne: 0,
            playerTwo: 0,
            playerThree: 0,
            playerFour: 0,
        },
    });

    const handleSubmit = (values: typeof form.values) => {

        const updatedPlayerScores = {
            ...playerInfo,
            playerOne: { ...playerInfo.playerOne, totalScore: playerInfo.playerOne.totalScore + values.playerOne},
            playerTwo: { ...playerInfo.playerTwo, totalScore: playerInfo.playerTwo.totalScore + values.playerTwo},
            playerThree: { ...playerInfo.playerThree, totalScore: playerInfo.playerThree.totalScore + values.playerThree},
            playerFour: { ...playerInfo.playerFour, totalScore: playerInfo.playerFour.totalScore + values.playerFour}
        }

        setPlayerInfo(updatedPlayerScores)

        if (Object.values((updatedPlayerScores)).some((player) => player.totalScore >= gameScore  )) {
            setGameOver(true)
        } else {
            form.reset()
        }      
    }


    return (
        <Stack align='center' justify='center'>
            <Text fw={700} mt={35} size='xl' className={genericStyles.header}>Points needed to win: {gameScore}</Text>
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
                        <VisualScorer />
                    </Group>
                

            </form>
        </Stack>
    )
}



export default GameScorer
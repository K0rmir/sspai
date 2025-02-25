import { Dispatch, FC, SetStateAction } from 'react';
import { PlayerInfo } from '@/interfaces/interfaces';
import { Button, Text, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { PlayerCard } from '@/components/GameScorer/PlayerCard';

type GameScorerProps = {
    playerNum: number,
    gameScore: number,
    playerInfo: PlayerInfo,
    setPlayerInfo: Dispatch<SetStateAction<PlayerInfo>>
}

const GameScorer: FC<GameScorerProps> = ({playerNum, gameScore, playerInfo, setPlayerInfo}) => {

    const form = useForm({
        initialValues: {
            playerOne: 0,
            playerTwo: 0,
            playerThree: 0,
            playerFour: 0,
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        setPlayerInfo((prev) => ({
            ...prev,
            playerOne: { ...prev.playerOne, totalScore: prev.playerOne.totalScore + values.playerOne},
            playerTwo: { ...prev.playerTwo, totalScore: prev.playerTwo.totalScore + values.playerTwo},
            playerThree: { ...prev.playerThree, totalScore: prev.playerThree.totalScore + values.playerThree},
            playerFour: { ...prev.playerFour, totalScore: prev.playerFour.totalScore + values.playerFour},
        }))
        form.reset()
    }


    return (
        <Stack>
        <Text fw={700}>Points needed to win: {gameScore}</Text>

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
        <Button type='submit'>Update Scores</Button>

        </form>
        </Stack>
    )
}



export default GameScorer
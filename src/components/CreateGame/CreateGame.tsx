import { FC, useState } from 'react';
import { Button, Group, Text, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import GameScorer from '../GameScorer/GameScorer';
import GameOver from '@/components/GameOver/GameOver'
import { PlayerInfo } from '@/interfaces/interfaces';
import styles from "./CreateGame.module.css";
import genericStyles from "@/components/GenericStyles.module.css";

const CreateGame: FC = () => {

    const [gameCreated, setGameCreated] = useState<boolean>(false)
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [playerNum, setPlayerNum] = useState<number>(2)
    const [gameScore, setGameScore] = useState<number>(40)
    const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({
        playerOne: { name: '', totalScore: 0 },
        playerTwo: { name: '', totalScore: 0 },
        playerThree: { name: '', totalScore: 0 },
        playerFour: { name: '', totalScore: 0 },
    })

    const handleSetGameInfo = (playerCount: number, score: number) => {
        setPlayerNum(playerCount)
        setGameScore(score)
    }

    const form = useForm({
        initialValues: {
            playerOne: '',
            playerTwo: '',
            playerThree: '',
            playerFour: '',
        },
    })

    const handleSubmit = (values: Record<keyof PlayerInfo, string>) => {
        setGameCreated(true)
        setPlayerInfo((prev) => ({
            ...prev,
            ...Object.fromEntries(Object.entries(values).map(([key, value]) => [
                key,
                {...prev[key as keyof PlayerInfo], name: value}
            ]))
        }))
    }

    return (
        <Stack align='center' justify='center'>
        {!gameCreated && !gameOver && (
            <Stack gap={25} justify='center' align='center'>
            <Text fw={700} mt={35} size='xl' className={genericStyles.header}>Select & Enter Players</Text>
            <Group gap={25} className={styles.playerButtons}>
    {[{ players: 2, score: 40 }, { players: 3, score: 35 }, { players: 4, score: 30 }].map(({ players, score }) => (
        <Button
            key={players}
            onClick={() => handleSetGameInfo(players, score)}
            className={playerNum === players ? styles.playerButtonsSelected : ""}
        >
            {players}
        </Button>
    ))}
</Group>
            <Stack>
                <form onSubmit={form.onSubmit(handleSubmit)} className={styles.playerNames}>              
                    <TextInput placeholder='Player One Name' required key={form.key('playerOne')} {...form.getInputProps('playerOne')}/>
                    <TextInput placeholder='Player Two Name' required key={form.key('playerTwo')} {...form.getInputProps('playerTwo')}/>
                {playerNum === 3 && ( <TextInput placeholder='Player Three Name' key={form.key('playerThree')} {...form.getInputProps('playerThree')} />)}
                {playerNum === 4 && ( 
                    <>
                    <TextInput placeholder='Player Three Name' required key={form.key('playerThree')} {...form.getInputProps('playerThree')} />
                    <TextInput placeholder='Player Four Name' required key={form.key('playerFour')} {...form.getInputProps('playerFour')}/>
                    </>
            )}
                <Group justify="center" pt={25}>
                <Button type="submit" size='lg' color='#b12a74'>Create Game</Button>
                </Group>
                </form>
            </Stack>
        </Stack>
        )}
        {gameCreated && !gameOver && <GameScorer playerNum={playerNum} gameScore={gameScore} playerInfo={playerInfo} setPlayerInfo={setPlayerInfo} setGameOver={setGameOver}/>}
        {gameOver && <GameOver playerInfo={playerInfo} />}
        </Stack>    
    )
}

export default CreateGame
import { FC, useState } from 'react';
import { Button, Group, Text, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import GameScorer from '../GameScorer/GameScorer';
import GameOver from '@/components/GameOver/GameOver'
import { PlayerInfo } from '@/interfaces/interfaces';

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

    const setGameInfo = (playerCount: number, score: number) => {
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
        <Stack>
        {!gameCreated && !gameOver && (
            <Stack>
            <Text fw={700}>Select & Enter Players</Text>
            <Group>            
                <Button onClick={() => setGameInfo(2, 40)}>2</Button>
                <Button onClick={() => setGameInfo(3, 35)}>3</Button>
                <Button onClick={() => setGameInfo(4, 30)}>4</Button>
            </Group>
            <Stack>
            <form onSubmit={form.onSubmit(handleSubmit)}>              
                    <TextInput placeholder='Player One Name' required key={form.key('playerOne')} {...form.getInputProps('playerOne')}/>
                    <TextInput placeholder='Player Two Name' required key={form.key('playerTwo')} {...form.getInputProps('playerTwo')}/>
                {playerNum === 3 && ( <TextInput placeholder='Player Three Name' key={form.key('playerThree')} {...form.getInputProps('playerThree')} />)}
                {playerNum === 4 && ( 
                    <>
                    <TextInput placeholder='Player Three Name' required key={form.key('playerThree')} {...form.getInputProps('playerThree')} />
                    <TextInput placeholder='Player Four Name' required key={form.key('playerFour')} {...form.getInputProps('playerFour')}/>
                    </>
            )}
            <Group justify="center">
                <Button type="submit">Create Game</Button>
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
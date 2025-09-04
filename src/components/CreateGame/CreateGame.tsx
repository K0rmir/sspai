import { FC } from 'react';
import { Button, Group, Text, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import styles from "./CreateGame.module.css";
import genericStyles from "@/components/GenericStyles.module.css";
import {gameStore} from "@/store/GameStore"
import { PlayerInfo } from '@/interfaces/interfaces';

const CreateGame: FC = () => {

    const {gameCreated, gameOver, playerNum, setTotalGameScore, createPlayers, setGameCreated, setPlayerNum} = gameStore()

    const handleSetGameInfo = (playerCount: number, score: number) => {
        setPlayerNum(playerCount)
        setTotalGameScore(score)
    }

    const form = useForm({
        initialValues: {
            playerOne: "",
            playerTwo: "",
            playerThree: "",
            playerFour: "",
        },
    })

    const handleSubmit = (values: Record<keyof PlayerInfo, string>) => {
        const names = Object.values(values).filter((name) => name !== '')
        createPlayers(names)
        setGameCreated()
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

        </Stack>    
    )
}

export default CreateGame
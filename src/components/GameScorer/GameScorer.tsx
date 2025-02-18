import { Dispatch, FC, SetStateAction } from 'react';
import { PlayerInfo, Player } from '@/interfaces/interfaces';
import { Button, Group, Text, Stack, TextInput, Card } from '@mantine/core';

type GameScorerProps = {
    playerNum: number,
    gameScore: number,
    playerInfo: PlayerInfo,
    setPlayerInfo: Dispatch<SetStateAction<PlayerInfo>>
}

const PlayerCard: FC<Player> = ({ name, score }) => {

    return (
        <>
        <Card shadow="sm" radius="md" withBorder>
            <Group>
                <Text>{name}</Text>
                <Text>{score}</Text>
            </Group>
        </Card>

        </>
    )
}

const GameScorer: FC<GameScorerProps> = ({playerNum, gameScore, playerInfo}) => {


    return (
        <Stack>
        <Text fw={700}>Points needed to win: {gameScore}</Text>

        <PlayerCard name={playerInfo.playerOne.name} score={playerInfo.playerOne.score} />
        <PlayerCard name={playerInfo.playerTwo.name} score={playerInfo.playerTwo.score} />
        {playerNum === 3 && <PlayerCard name={playerInfo.playerThree.name} score={playerInfo.playerThree.score} />}
        {playerNum === 4 && (
            <>
            <PlayerCard name={playerInfo.playerThree.name} score={playerInfo.playerThree.score} />
            <PlayerCard name={playerInfo.playerFour.name} score={playerInfo.playerFour.score} />
            </>

        )}
        

        </Stack>

    )

}



export default GameScorer
import { PlayerInfo } from '@/interfaces/interfaces';

type GameOverProps = {
    playerInfo: PlayerInfo;
  };

const GameOver = ({playerInfo}: GameOverProps) => {

    console.log("players info in game over =", playerInfo)



    return (
        <>
        <p>Game Over, man</p>
        </>
    )

}

export default GameOver
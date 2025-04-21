import CreateGame from '@/components/CreateGame/CreateGame';
import { Header } from '@/components/Header/Header';
import GameScorer from '@/components/GameScorer/GameScorer';
import GameOver from '@/components/GameOver/GameOver'
import { GameHistory } from '@/components/GameHistory/GameHistory';
import {gameStore} from "@/store/GameStore"
// import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

export function HomePage() {

   const { gameCreated, gameHistory, gameOver, playerInfo } = gameStore()


  return (
    <>
      <Header/>
      {!gameHistory && <CreateGame />}
      {gameCreated && !gameOver && <GameScorer />}
      {gameOver && <GameOver playerInfo={playerInfo} />}
      {gameHistory && <GameHistory/>}

      {/* <ColorSchemeToggle /> */}

    </>
  );
}

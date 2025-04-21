import { FC } from 'react';
import styles from "./GameCard.module.css";
import { GameRecord } from '@/interfaces/interfaces';

type GameCardProps = {
    gameRecord: GameRecord
}


export const GameCard: FC<GameCardProps> = ({ gameRecord }) => {
    const { gameDate, playerInfo } = gameRecord;
  
    return (

        <div className={styles.gameCard}>
            <div className={styles.header}>{gameDate}</div>
              <ul>
           {Object.entries(playerInfo).map(([key, player]) => (
             <li key={key}>
               {player.name} - {player.totalScore} points
             </li>
           ))}
         </ul>


        </div>

    );
  };
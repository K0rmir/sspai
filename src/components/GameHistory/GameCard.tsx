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
             
           {Object.entries(playerInfo).map(([key, player]) => (
             <div key={key} className={styles.playerEntry}>
               {player.name} - {player.totalScore}
             </div>
           ))}
        


        </div>

    );
  };
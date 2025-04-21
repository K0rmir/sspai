import { FC } from 'react';
import { Group } from '@mantine/core';
// import  VisualScorer  from "@/components/VisualScorer/VisualScorer"
import { GameHistory } from './HeaderButtons/GameHistory';

export const Header: FC = () => {

    // Looks like we're going to have to add some kind of global store / context as I now need to access game state data from a higher up component. 
    // Buttons should be rendered in header depending on game state. 
    // Game creation view - History button
    // Game started / in progress - Visual scorer button
    // Game over view - History button

    return (
        <Group align='space-between'>
           {/* <VisualScorer  /> */}
           <GameHistory/>
           
        </Group>
    )

}
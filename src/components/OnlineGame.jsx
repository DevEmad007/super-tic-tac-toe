import React,{ useState } from 'react';
import { useGameContext } from '../hooks/useGameContext';
import Cell from './Cell';

const OnlineGame = () => {
    const { roomData } = useGameContext();

    console.log(roomData.smallBox.id0);

    return (
        <>
            {

            }

        </>
    );
};

export default OnlineGame;
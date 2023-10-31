import React from 'react';
import Game from './Game';
import { useGameContext } from '../hooks/useGameContext';

const GameBoard = () => {
    const { XsTurn } = useGameContext();
    return (
        <Game />
    );
};

export default GameBoard;

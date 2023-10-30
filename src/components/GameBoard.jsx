import React from 'react';
import Game from './Game';
import { useGameContext } from '../hooks/useGameContext';

const GameBoard = () => {
    const { XsTurn } = useGameContext();
    return (
        <div style={{ backgroundColor: XsTurn ? '#c4302b' : '#1882FC' }} className={`gameboard`}>
            <Game />
        </div>
    );
};

export default GameBoard;

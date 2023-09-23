import React from 'react';
import Home from '../home';
import Game from './Game';
import { Table } from 'react-bootstrap';

const GameBoard = () => {
    return (
        <div className='gameboard'>
            <Game />
            <div>
                <Table striped bordered hover className='table' >
                    <thead>
                        <tr>
                            <th>Player 01</th>
                            <th>Player 01</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>00</td>
                            <td>00</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default GameBoard;

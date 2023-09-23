import React from 'react';
import Cell from './Cell';
import { useState,useEffect } from 'react';


const Game = () => {
    const [ cell,setCell ] = useState(Array(9).fill(null));
    const [ XsTurn,setXsTurn ] = useState(true);

    const checkWinner = () => {
        const lines = [
            [ 0,1,2 ],
            [ 3,4,5 ],
            [ 6,7,8 ],
            [ 0,3,6 ],
            [ 1,4,7 ],
            [ 2,5,8 ],
            [ 0,4,8 ],
            [ 2,4,6 ],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [ a,b,c ] = lines[ i ];
            if (cell[ a ] && cell[ a ] === cell[ b ] && cell[ a ] === cell[ c ]) {
                alert(cell[ a ] + 'winner');
            }
        }
        return null;
    };

    useEffect(() => {
        checkWinner(cell);
    },[ cell ]);

    const handleClick = (e) => {
        setXsTurn(!XsTurn);
        if (XsTurn) {
            setCell(prev => {
                const newArray = [ ...prev ];
                newArray[ e ] = 'X';
                return newArray;
            });
        }
        else {
            setCell(prev => {
                const newArray = [ ...prev ];
                newArray[ e ] = 'O';
                return newArray;
            });
        }
    };
    console.log(cell);


    return (
        <div className='nineBox'>
            {cell.map((cell,index) => <Cell
                key={index}
                handleClick={() => handleClick(index)}
            >
                {cell}
            </Cell>)}
        </div>
    );
};

export default Game;

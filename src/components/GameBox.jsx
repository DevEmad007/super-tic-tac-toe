import { Hidden } from '@mui/material';
import Cell from './Cell';
import { useState,useEffect,useRef } from 'react';


const GameBox = ({ XsTurn,setXsTurn,id: boXId,setTrigerRender }) => {
    const [ cell,setCell ] = useState(Array(9).fill(null));
    const [ nxtPlayBox,setNxtPlayBox ] = useState('');
    const [ firstTime,setFirstTime ] = useState(true);
    const cellID = useRef();

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

    const CheckBox = () => {

        console.log(boXId);
        console.log(cellID.current);
        if (boXId == 0) {
            if (cellID.current == 5) {
                setNxtPlayBox(1);
            }
            if (cellID.current == 7) {
                setNxtPlayBox(3);
            }
            if (cellID.current == 8) {
                setNxtPlayBox(4);
            }
        }
        setTrigerRender(e => e + 1);
    };

    useEffect(() => {
        checkWinner();
        CheckBox();
    },[ cell ]);

    const handleClick = (e) => {
        setFirstTime(false);
        cellID.current = e;
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
    console.log(nxtPlayBox);
    console.log(boXId);
    return (
        <div className='gameBox' >
            <div className={`${firstTime ? 'hidden' :
                nxtPlayBox == boXId ? 'layer' : 'hidden'}`}></div>
            {cell.map((cell,index) => <Cell
                key={index}
                handleClick={() => handleClick(index)}
            >
                {cell}
            </Cell>)}
        </div>
    );
};

export default GameBox;

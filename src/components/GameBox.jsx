import Cell from './Cell';
import { useState,useEffect } from 'react';

const GameBox = ({ XsTurn,setXsTurn,bigBoxValue,id: boxID,setData,CheckBox,nxtPlayBox }) => {
    const [ cell,setCell ] = useState(Array(9).fill(null));

    useEffect(() => {
        setData(cell);
    },[ cell ]);

    const handleClick = (cell,cellID) => {

        if (cell !== null) {
            return;
        }
        setXsTurn(!XsTurn);
        if (XsTurn) {
            setCell(prev => {
                const newArray = [ ...prev ];
                newArray[ cellID ] = 'X';
                return newArray;
            });
        }
        else {
            setCell(prev => {
                const newArray = [ ...prev ];
                newArray[ cellID ] = 'O';
                return newArray;
            });
        }
        CheckBox(boxID,cellID);
    };
    console.log(bigBoxValue);
    return (
        <div className='gameBox' >
            <div className={`${bigBoxValue == null ? 'hidden' : bigBoxValue == 'X' ? 'X' : 'hidden'}`}></div>
            <div className={`${bigBoxValue == null ? 'hidden' : bigBoxValue == 'O' ? 'O' : 'hidden'}`}>
                <div></div>
            </div>
            <div className={`${nxtPlayBox == null ? 'hidden' : nxtPlayBox == boxID ? 'hidden' : 'layer'}`}></div>
            {cell.map((cell,index) => <Cell
                key={index}
                handleClick={() => handleClick(cell,index)}
            >
                {cell}
            </Cell>)}
        </div>
    );
};

export default GameBox;

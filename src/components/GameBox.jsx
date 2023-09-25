import Cell from './Cell';
import { useState,useEffect } from 'react';
import useSkipRender from './useSkipRender';
import { useGameContext } from '../hooks/useGameContext';

const GameBox = ({ bigBoxValue,id: boxID,resetCell }) => {
    const [ cell,setCell ] = useState(Array(9).fill(null));

    const { XsTurn,setXsTurn,CheckBox,checkWinner,nxtPlayBox } = useGameContext();

    useSkipRender(() => {
        setCell(Array(9).fill(null));
        //skips render 
        //wait for resetCell to change which depends on reset button
    },resetCell);

    const handleClick = (cell,cellID) => {
        if (cell !== null) {
            return;
            // checks if the cell is empty 
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
        // set the value of array depending on player 
        CheckBox(boxID,cellID);
        //set next gamebox to to play
    };

    useEffect(() => {
        checkWinner(cell);
        //check if the gameBox git winner 
    },[ cell ]);

    return (
        <div className='gameBox' >
            <div className={`${bigBoxValue == null ? 'hidden' : bigBoxValue == 'X' ? 'X' : 'hidden'}`}></div>
            {/* if X won the gameBox layer */}
            <div className={`${bigBoxValue == null ? 'hidden' : bigBoxValue == 'O' ? 'O' : 'hidden'}`}>
                <div></div>
            </div>
            {/* if "O" won the gameBox layer */}
            <div className={`${nxtPlayBox == null ? 'hidden' : nxtPlayBox == boxID ? 'hidden' : 'layer'}`}></div>
            {/* prevent player from clicking other box then the next play box */}
            {cell.map((cell,index) => <Cell
                key={index}
                handleClick={() => handleClick(cell,index)}
            >
                {cell}
            </Cell>)}
            {/* maps out cells of gameBox  */}
        </div>
    );
};

export default GameBox;

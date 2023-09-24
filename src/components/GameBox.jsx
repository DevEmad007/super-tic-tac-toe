import Cell from './Cell';
import { useState,useEffect,useRef } from 'react';
import useSkipRender from './useSkipRender';

const GameBox = ({ XsTurn,setXsTurn,bigBoxValue,id: boxID,setData,CheckBox,nxtPlayBox,resetCell }) => {
    const [ cell,setCell ] = useState(Array(9).fill(null));
    const [ cellId,setCellId ] = useState();
    const isFirstRender = useRef(true);

    useEffect(() => {
        setData(cell);
    },[ cell ]);

    // useEffect(() => {
    //     //skips first render
    //     if (isFirstRender.current) {
    //         isFirstRender.current = false;
    //         return;
    //     }
    //     setCell(Array(9).fill(null));
    // },[ resetCell ]);

    useSkipRender(() => {
        setCell(Array(9).fill(null));

    },resetCell);

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
        setCellId(cellID);
        CheckBox(boxID,cellID);
    };

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

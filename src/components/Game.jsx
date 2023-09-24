import GameBox from "./GameBox";
import { useState,useEffect,useRef } from 'react';

const Game = () => {
    const [ bigBox,setBigBox ] = useState(Array(9).fill(null));
    const [ bigBoxID,setBigBoxID ] = useState();
    const [ XsTurn,setXsTurn ] = useState(true);
    const [ data,setData ] = useState();
    const [ nxtPlayBox,setNxtPlayBox ] = useState(null);

    const checkWinner = () => {
        if (data == null) {
            return;
        }
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
        console.log(XsTurn);
        for (let i = 0; i < lines.length; i++) {
            const [ a,b,c ] = lines[ i ];
            if (data[ a ] && data[ a ] === data[ b ] && data[ a ] === data[ c ]) {
                if (!XsTurn) { //condition is inverted bcz state changes one chick after
                    setBigBox(prev => {
                        const newArray = [ ...prev ];
                        newArray[ bigBoxID ] = 'X';
                        return newArray;
                    });
                }
                else {
                    setBigBox(prev => {
                        const newArray = [ ...prev ];
                        newArray[ bigBoxID ] = 'O';
                        return newArray;
                    });
                }
            }
        }
        return null;
    };

    useEffect(() => {
        checkWinner();
    },[ data ]);


    const CheckBox = (boxID,cellID) => {
        if (boxID == 4) {
            setNxtPlayBox(cellID);
        }
        if (boxID == 0) {
            if (cellID == 5) {
                setNxtPlayBox(1);
            }
            else if (cellID == 7) {
                setNxtPlayBox(3);
            }
            else if (cellID == 8) {
                setNxtPlayBox(4);
            }
            else if (cellID == 4) {
                setNxtPlayBox(boxID);
            } else {
                setNxtPlayBox(null);
            }
        }
        if (boxID == 1) {
            if (cellID == 5) {
                setNxtPlayBox(2);
            }
            else if (cellID == 7) {
                setNxtPlayBox(4);
            }
            else if (cellID == 8) {
                setNxtPlayBox(5);
            }
            else if (cellID == 3) {
                setNxtPlayBox(0);
            }
            else if (cellID == 6) {
                setNxtPlayBox(3);
            }
            else if (cellID == 4) {
                setNxtPlayBox(boxID);
            } else {
                setNxtPlayBox(null);
            }
        }
        if (boxID == 2) {
            if (cellID == 3) {
                setNxtPlayBox(1);
            }
            else if (cellID == 6) {
                setNxtPlayBox(4);
            }
            else if (cellID == 7) {
                setNxtPlayBox(5);
            }
            else if (cellID == 4) {
                setNxtPlayBox(boxID);
            }
            else {
                setNxtPlayBox(null);
            }
        }
        if (boxID == 3) {
            if (cellID == 1) {
                setNxtPlayBox(0);
            }
            else if (cellID == 2) {
                setNxtPlayBox(1);
            }
            else if (cellID == 5) {
                setNxtPlayBox(4);
            }
            else if (cellID == 8) {
                setNxtPlayBox(7);
            }
            else if (cellID == 7) {
                setNxtPlayBox(6);
            }
            else if (cellID == 4) {
                setNxtPlayBox(boxID);
            }
            else {
                setNxtPlayBox(null);
            }
        }
        if (boxID == 5) {
            if (cellID == 1) {
                setNxtPlayBox(2);
            }
            else if (cellID == 0) {
                setNxtPlayBox(1);
            }
            else if (cellID == 3) {
                setNxtPlayBox(4);
            }
            else if (cellID == 6) {
                setNxtPlayBox(7);
            }
            else if (cellID == 7) {
                setNxtPlayBox(8);
            }
            else if (cellID == 4) {
                setNxtPlayBox(boxID);
            }
            else {
                setNxtPlayBox(null);
            }
        }
        if (boxID == 6) {
            if (cellID == 1) {
                setNxtPlayBox(3);
            }
            else if (cellID == 2) {
                setNxtPlayBox(4);
            }
            else if (cellID == 5) {
                setNxtPlayBox(7);
            }
            else if (cellID == 4) {
                setNxtPlayBox(boxID);
            }
            else {
                setNxtPlayBox(null);
            }
        }
        if (boxID == 7) {
            if (cellID == 3) {
                setNxtPlayBox(6);
            }
            else if (cellID == 0) {
                setNxtPlayBox(3);
            }
            else if (cellID == 1) {
                setNxtPlayBox(4);
            }
            else if (cellID == 2) {
                setNxtPlayBox(5);
            }
            else if (cellID == 5) {
                setNxtPlayBox(8);
            }
            else if (cellID == 4) {
                setNxtPlayBox(boxID);
            }
            else {
                setNxtPlayBox(null);
            }
        }
        if (boxID == 8) {
            if (cellID == 3) {
                setNxtPlayBox(7);
            }
            else if (cellID == 0) {
                setNxtPlayBox(4);
            }
            else if (cellID == 1) {
                setNxtPlayBox(5);
            }
            else if (cellID == 4) {
                setNxtPlayBox(boxID);
            }
            else {
                setNxtPlayBox(null);
            }
        }
        setBigBoxID(boxID);
    };
    console.log('box  ' + bigBoxID);
    console.log(bigBox);
    return (
        <div className="game">
            {
                bigBox.map((value,index) =>
                    < GameBox
                        XsTurn={XsTurn}
                        setXsTurn={setXsTurn}
                        bigBoxValue={value}
                        id={index}
                        setData={setData}
                        CheckBox={CheckBox}
                        nxtPlayBox={nxtPlayBox}
                        key={index}
                    />
                )
            }
        </div>
    );
};

export default Game;

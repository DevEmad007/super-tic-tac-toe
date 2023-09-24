import GameBox from "./GameBox";
import { useState,useEffect } from 'react';
import { PlayerOne,PlayerTwo } from "./Cell";
import BootstrapModal from "./BootstrapModal";
import { Button } from "react-bootstrap";
import useSkipRender from "./useSkipRender";

const Game = () => {
    const [ bigBox,setBigBox ] = useState(Array(9).fill(null));
    const [ bigBoxID,setBigBoxID ] = useState();
    const [ XsTurn,setXsTurn ] = useState(true);
    const [ data,setData ] = useState(null);
    const [ nxtPlayBox,setNxtPlayBox ] = useState(null);
    const [ resetCell,setResetCell ] = useState(false);
    const [ winner,setWinner ] = useState(null);
    const [ modalShow,setModalShow ] = useState(false);

    const screenWidth = screen.width;

    const checkWinner = (cellData,showmessage) => {
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
            if (cellData[ a ] && cellData[ a ] === cellData[ b ] && cellData[ a ] === cellData[ c ]) {
                if (showmessage) {
                    setModalShow(true);
                    setWinner(`${cellData[ a ]}`);
                }
                if (!XsTurn) { //condition is inverted bcz state changes one click after
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
    console.log(winner);

    useEffect(() => {
        checkWinner(data,false);
        checkWinner(bigBox,true);
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

    useEffect(() => {
        if (bigBox[ nxtPlayBox ] !== null) {
            setNxtPlayBox(null);
        }
    });

    const handleReset = () => {
        setBigBox(Array(9).fill(null));
        setResetCell(!resetCell);
        setNxtPlayBox(null);
        setModalShow(false);
        setWinner(null);
    };

    const handleClose = () => {
        setModalShow(false);
    };

    return (
        <>
            <Button onClick={() => setModalShow(true)}>Reset</Button>
            <BootstrapModal
                winner={winner}
                show={modalShow}
                handleReset={handleReset}
                handleClose={handleClose}
                onHide={() => setModalShow(false)}
            />
            <div className="player">
                <PlayerOne
                    className={'playerone'}
                    active={!XsTurn}
                    fontsize={screenWidth > 600 ? '100px' : '66px'}
                />
            </div>
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
                            resetCell={resetCell}
                            key={index}
                        />
                    )
                }
            </div>
            <div className="player">
                <PlayerTwo
                    className={'playertwo'}
                    active={XsTurn}
                    fontsize={screenWidth > 600 ? '100px' : '66px'}
                />
            </div>
        </>
    );
};

export default Game;

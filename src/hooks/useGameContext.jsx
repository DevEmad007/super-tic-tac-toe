import { createContext,useContext } from "react";
import { useState,useEffect } from "react";
export const gameContext = createContext();

export const useGameContext = () => {
    return useContext(gameContext);
};

export const GameContext = ({ children }) => {
    const [ bigBox,setBigBox ] = useState(Array(9).fill(null));
    const [ XsTurn,setXsTurn ] = useState(true);
    const [ bigBoxID,setBigBoxID ] = useState();
    const [ modalShow,setModalShow ] = useState(false);
    const [ nxtPlayBox,setNxtPlayBox ] = useState(null);
    const [ winner,setWinner ] = useState(null);


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

    const checkWinner = (cellData) => {
        if (cellData === null) {
            return;
        }
        for (let i = 0; i < lines.length; i++) {
            const [ a,b,c ] = lines[ i ];
            if (cellData[ a ] && cellData[ a ] === cellData[ b ] && cellData[ a ] === cellData[ c ]) {
                if (!XsTurn) {
                    //condition is inverted bcz state changes one click behind
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
        checkWinner(bigBox);
    },[ XsTurn ]);

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
        // id of current gameBox
    };

    useEffect(() => {
        if (bigBox[ nxtPlayBox ] !== null) {
            setNxtPlayBox(null);
        }
        if (bigBox !== null) {
            for (let i = 0; i < lines.length; i++) {
                const [ a,b,c ] = lines[ i ];
                if (bigBox[ a ] && bigBox[ a ] === bigBox[ b ] && bigBox[ a ] === bigBox[ c ]) {
                    setModalShow(true);
                    setWinner(`${bigBox[ a ]}`);
                }
            }
        }
    });

    const values = {
        bigBox,
        setBigBox,
        XsTurn,
        setXsTurn,
        nxtPlayBox,
        checkWinner,
        winner,
        setWinner,
        CheckBox,
        modalShow,
        setModalShow,
        setNxtPlayBox
    };
    return < gameContext.Provider value={values}> {children}</gameContext.Provider>;
};
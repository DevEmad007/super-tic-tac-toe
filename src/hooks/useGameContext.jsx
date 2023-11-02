import { createContext,useContext,useMemo,useRef } from "react";
import { useState,useEffect } from "react";
import { getFirestore,doc,setDoc,updateDoc,onSnapshot,onSnapshotsInSync } from "firebase/firestore";
import { useNavigate } from "react-router";
import { getRoomData } from "../API/updateRoom";
import useSkipRender from "./useSkipRender";

export const gameContext = createContext();

export const useGameContext = () => {
    return useContext(gameContext);
};

export const GameContext = ({ children }) => {
    const db = getFirestore();
    const navigate = useNavigate();
    const [ bigBox,setBigBox ] = useState(Array(9).fill(null));
    const [ XsTurn,setXsTurn ] = useState(true);
    const [ smallBoxID,setSmallBoxID ] = useState(null);
    const [ cellid,setCellid ] = useState(null);
    const [ modalShow,setModalShow ] = useState(false);
    const [ nxtPlayBox,setNxtPlayBox ] = useState(null);
    const [ winner,setWinner ] = useState(null);
    const [ isDraw,setIsDraw ] = useState(false);
    const [ isTwistModeOn,setIsTwistModeOn ] = useState(false);
    const [ isOnlinePlaying,setIsOnlinePlaying ] = useState(false);
    const [ roomID,setRoomID ] = useState('');
    const [ roomData,setRoomData ] = useState();
    const [ playersIn,setPlayersIn ] = useState();
    const [ player,setPlayer ] = useState(null);

    const handleOnlinePlay = () => {
        setIsOnlinePlaying(true);
        navigate('/gameOnlineT');
    };

    const createRoom = async (roomID) => {
        handleOnlinePlay();
        setRoomID(roomID.toString());
        const dbRef = doc(db,"room",roomID?.toString());
        const roomDatas = {
            id: roomID,
            playerOneIn: true,
            playerTwoIn: null,
            XsTurn: XsTurn,
            smallBox: {
                id0: Array(9).fill(null),
                id1: Array(9).fill(null),
                id2: Array(9).fill(null),
                id3: Array(9).fill(null),
                id4: Array(9).fill(null),
                id5: Array(9).fill(null),
                id6: Array(9).fill(null),
                id7: Array(9).fill(null),
                id8: Array(9).fill(null),
            },
            smallBoxID: smallBoxID,
            cellid: cellid,
            nxtPlayBox: nxtPlayBox,
            bigBox: Array(9).fill(null),
            isReset: true,
        };
        setPlayer("X");
        setRoomData(roomDatas);
        //setRoomData to the local Storage
        try {
            await setDoc(dbRef,roomDatas);
        } catch (error) {
            console.log(error);
        }
    };

    const joinRoom = async (roomID) => {
        handleOnlinePlay();
        setRoomID(roomID.toString());
        setPlayer("O");
        const dbRef = doc(db,"room",roomID.toString());
        try {
            await updateDoc(dbRef,{
                'playerTwoIn': true,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useMemo(() => {
        if (isOnlinePlaying) {
            getRoomData(roomID,setRoomData,setXsTurn,setNxtPlayBox,setSmallBoxID,setCellid);
        }
    },[ isOnlinePlaying,roomID ]);

    const updateRoom = async () => {
        const roomRef = doc(db,"room",roomID);
        try {
            await updateDoc(roomRef,{
                XsTurn: XsTurn,
                bigBox: bigBox,
                smallBoxID: smallBoxID,
                nxtPlayBox: nxtPlayBox,
                cellid: cellid,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isOnlinePlaying) {
            updateRoom();
        }
    },[ XsTurn,nxtPlayBox,cellid ]);

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
        if (cellData !== null) {
            for (let i = 0; i < lines.length; i++) {
                const [ a,b,c ] = lines[ i ];
                if (cellData[ a ] && cellData[ a ] === cellData[ b ] && cellData[ a ] === cellData[ c ]) {
                    if (!XsTurn) {
                        //condition is inverted bcz state changes one click behind
                        setBigBox(prev => {
                            const newArray = [ ...prev ];
                            newArray[ smallBoxID ] = 'X';
                            return newArray;
                        });
                    }
                    else {
                        setBigBox(prev => {
                            const newArray = [ ...prev ];
                            newArray[ smallBoxID ] = 'O';
                            return newArray;
                        });
                    }
                }
            }
        }
    };

    const CheckBoxTwisted = (boxID,cellID) => {
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
        setSmallBoxID(boxID);
        setCellid(cellID);
        // id of current gameBox & cell
    };

    const handleTwistMode = () => {
        setIsTwistModeOn(true);
        setIsOnlinePlaying(false);
    };

    const handleNormalMode = () => {
        setIsOnlinePlaying(false);
        setIsTwistModeOn(false);
    };

    const CheckBox = (boxID,cellID) => {
        setNxtPlayBox(cellID);
        setSmallBoxID(boxID);
        setCellid(cellID);
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
        if (bigBox.filter(i => i == null).length < 1) {
            setModalShow(true);
            setIsDraw(true);
        };
    });

    const values = {
        player,
        bigBox,
        setBigBox,
        smallBoxID,
        cellid,
        XsTurn,
        setXsTurn,
        nxtPlayBox,
        checkWinner,
        winner,
        setWinner,
        isDraw,
        setIsDraw,
        CheckBox,
        isTwistModeOn,
        CheckBoxTwisted,
        modalShow,
        setModalShow,
        setNxtPlayBox,
        handleTwistMode,
        handleNormalMode,
        isOnlinePlaying,
        setIsOnlinePlaying,
        createRoom,
        joinRoom,
        roomID,
        roomData,
        setRoomData,
        playersIn
    };
    return < gameContext.Provider value={values}> {children}</gameContext.Provider>;
};
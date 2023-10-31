import Cell from './Cell';
import { useState,useEffect } from 'react';
import useSkipRender from '../hooks/useSkipRender';
import { useGameContext } from '../hooks/useGameContext';
import { getFirestore,doc,updateDoc,setDoc,getDocs,onSnapshot } from "firebase/firestore";

const SmallBox = ({ bigBoxValue,id: boxID,resetCell }) => {
    const db = getFirestore();
    const [ smallBox,setSmallBox ] = useState(Array(9).fill(null));
    const {
        setBigBox,
        XsTurn,
        setXsTurn,
        smallBoxID,
        cellid,
        CheckBox,
        isTwistModeOn,
        CheckBoxTwisted,
        checkWinner,
        nxtPlayBox,
        roomID,
        playersIn,
        isOnlinePlaying,
        roomData } = useGameContext();

    const updateRoom = async (cellID) => {
        const roomRef = doc(db,"room",roomID.toString());
        try {
            if (cellID === 0) {
                await updateDoc(roomRef,{
                    'smallBox.id0': smallBox
                });
            }
            else if (cellID == 1) {
                await updateDoc(roomRef,{
                    'smallBox.id1': smallBox
                });
            }
            else if (cellID == 2) {
                await updateDoc(roomRef,{
                    'smallBox.id2': smallBox
                });
            }
            else if (cellID == 3) {
                await updateDoc(roomRef,{
                    'smallBox.id3': smallBox
                });
            }
            else if (cellID == 4) {
                await updateDoc(roomRef,{
                    'smallBox.id4': smallBox
                });
            }
            else if (cellID == 5) {
                await updateDoc(roomRef,{
                    'smallBox.id5': smallBox
                });
            }
            else if (cellID == 6) {
                await updateDoc(roomRef,{
                    'smallBox.id6': smallBox
                });
            }
            else if (cellID == 7) {
                await updateDoc(roomRef,{
                    'smallBox.id7': smallBox
                });
            }
            else if (cellID == 8) {
                await updateDoc(roomRef,{
                    'smallBox.id8': smallBox
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useSkipRender(() => {
        setSmallBox(Array(9).fill(null));
        //skips render 
        //wait for resetCell to change which depends on reset button
    },resetCell);

    const handleCellClick = (cell,cellID) => {
        if (cell !== null) {
            return;
            // checks if the cell is empty 
        }
        setXsTurn(!XsTurn);
        if (XsTurn) {
            setSmallBox(prev => {
                const newArray = [ ...prev ];
                newArray[ cellID ] = 'X';
                return newArray;
            });
        }
        else {
            setSmallBox(prev => {
                const newArray = [ ...prev ];
                newArray[ cellID ] = 'O';
                return newArray;
            });
        }
        // set the value of array depending on player 
        if (isTwistModeOn) {
            CheckBoxTwisted(boxID,cellID);
        }
        else {
            CheckBox(boxID,cellID);
        }
        //set next gamebox to to play
    };

    useEffect(() => {
        checkWinner(smallBox);
        //check if the gameBox git winner
        if (isOnlinePlaying) {
            updateRoom(smallBoxID);
        }
    },[ smallBox ]);

    useEffect(() => {
        if (isOnlinePlaying && roomData !== undefined || null) {
            // setBigBox(roomData?.bigBox);
            // if (smallBoxID === 0) {
            //     setSmallBox(roomData?.smallBox?.id0);
            // }
            // else if (smallBoxID === 1) {
            //     setSmallBox(roomData?.smallBox?.id1);
            // }
        }
        console.log('first');
    },[ XsTurn ]);

    return (
        <div className='gameBox' >
            <div className={`${bigBoxValue == null ? 'hidden' : bigBoxValue == 'X' ? 'X' : 'hidden'}`}></div>
            {/* if X won the gameBox layer */}
            <div className={`${bigBoxValue == null ? 'hidden' : bigBoxValue == 'O' ? 'O' : 'hidden'}`}>
                <div></div>
            </div>
            {/* if "O" won the gameBox layer */}
            <div className={`${nxtPlayBox == null ? 'hidden' : nxtPlayBox == boxID ? 'hidden' : 'layer'}`}></div>
            {/* <div className={`${playersIn ? 'hidden' : 'layer'}`}></div> */}
            {/* prevent player from clicking other box then the next play box */}
            {
                smallBox.map(
                    (cell,index) => <Cell
                        key={index}
                        handleClick={() => handleCellClick(cell,index)}
                    >
                        {cell}
                    </Cell>
                )
            }
            {/* maps out cells of gameBox  */}
        </div>
    );
};

export default SmallBox;

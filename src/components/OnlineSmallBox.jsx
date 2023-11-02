import Cell from './Cell';
import { useState,useEffect } from 'react';
import useSkipRender from '../hooks/useSkipRender';
import { useGameContext } from '../hooks/useGameContext';
import { getFirestore,doc,updateDoc } from "firebase/firestore";

const OnlineSmallBox = ({ bigBoxValue,id: boxID,resetCell }) => {
    const db = getFirestore();
    const [ smallBox,setSmallBox ] = useState(Array(9).fill(null));
    const [ cellID,setCellID ] = useState(null);
    const {
        player,
        bigBox,
        setBigBox,
        XsTurn,
        setXsTurn,
        smallBoxID,
        CheckBox,
        isTwistModeOn,
        CheckBoxTwisted,
        checkWinner,
        nxtPlayBox,
        roomID,
        roomData,
    } = useGameContext();

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
        setCellID(cellID);
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

    const compareAndMergeArrays = (array1,array2) => {
        // Create an empty array to store the merged array.
        const mergedArray = [];
        // Iterate over the arrays and compare the elements at each index.
        for (let i = 0; i < array1.length; i++) {
            // If the elements at the current index are different, then add the element from the second array to the merged array.
            if (array1[ i ] && array2[ i ] === null) {
                mergedArray.push(array1[ i ]);
            } else {
                mergedArray.push(array2[ i ]);
            }
        }
        // Return the merged array.
        return mergedArray;
    };

    useEffect(() => {
        //check if the gameBox git winner
        updateRoom(boxID);
    },[ smallBox,bigBoxValue ]);

    useEffect(() => {
        checkWinner(smallBox);
    },[ cellID,bigBoxValue,nxtPlayBox,smallBoxID ]);

    useEffect(() => {
        setSmallBox(() => compareAndMergeArrays(smallBox,bigBoxValue));
        if (roomData !== undefined) {
            setBigBox(() => compareAndMergeArrays(bigBox,roomData.bigBox));
        }
    },[ bigBoxValue,nxtPlayBox ]);
    // console.log(boxID);
    // console.log(bigBoxValue);
    // console.table(smallBox);
    console.log(bigBox);
    return (
        <div className='gameBox' >
            <div className={`${bigBox[ boxID ] == null ? 'hidden' : bigBox[ boxID ] == 'X' ? 'X' : 'hidden'}`}></div>
            {/* if X won the gameBox layer */}
            <div className={`${bigBox[ boxID ] == null ? 'hidden' : bigBox[ boxID ] == 'O' ? 'O' : 'hidden'}`}>
                <div></div>
            </div>
            {/* if "O" won the gameBox layer */}
            <div className={`${nxtPlayBox == null ? 'hidden' : nxtPlayBox == boxID ? 'hidden' : 'layer'}`}></div>

            <div style={{ backgroundColor: 'transparent' }} className={`${XsTurn && player === "X" ? 'hidden' : !XsTurn && player === "O" ? 'hidden' : 'layer'}`}></div>
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

export default OnlineSmallBox;

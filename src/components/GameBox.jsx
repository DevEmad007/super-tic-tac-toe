import Cell from './Cell';
import { useState,useEffect } from 'react';
import useSkipRender from './../hooks/useSkipRender';
import { useGameContext } from '../hooks/useGameContext';
import { getFirestore,doc,updateDoc,setDoc,getDocs,onSnapshot } from "firebase/firestore";

const GameBox = ({ bigBoxValue,id: boxID,resetCell }) => {
    const db = getFirestore();
    const [ cell,setCell ] = useState(Array(9).fill(null));
    const { XsTurn,
        setXsTurn,
        bigBoxID,
        CheckBox,
        isTwistModeOn,
        CheckBoxTwisted,
        checkWinner,
        nxtPlayBox,
        roomID,
        playersIn,
        isOnlinePlaying } = useGameContext();

    const updateRoom = async (cellID) => {
        const roomRef = doc(db,"room",roomID.toString());
        try {
            if (cellID === 0) {
                await updateDoc(roomRef,{
                    'smallBox.id0': cell
                });
            }
            else if (cellID == 1) {
                await updateDoc(roomRef,{
                    'smallBox.id1': cell
                });
            }
            else if (cellID == 2) {
                await updateDoc(roomRef,{
                    'smallBox.id2': cell
                });
            }
            else if (cellID == 3) {
                await updateDoc(roomRef,{
                    'smallBox.id3': cell
                });
            }
            else if (cellID == 4) {
                await updateDoc(roomRef,{
                    'smallBox.id4': cell
                });
            }
            else if (cellID == 5) {
                await updateDoc(roomRef,{
                    'smallBox.id5': cell
                });
            }
            else if (cellID == 6) {
                await updateDoc(roomRef,{
                    'smallBox.id6': cell
                });
            }
            else if (cellID == 7) {
                await updateDoc(roomRef,{
                    'smallBox.id7': cell
                });
            }
            else if (cellID == 8) {
                await updateDoc(roomRef,{
                    'smallBox.id8': cell
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

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
        if (isTwistModeOn) {
            CheckBoxTwisted(boxID,cellID);
        } else {
            CheckBox(boxID,cellID);
        }
        //set next gamebox to to play
    };

    useEffect(() => {
        checkWinner(cell);
        //check if the gameBox git winner
        if (isOnlinePlaying) {
            updateRoom(bigBoxID);
        }
    },[ cell ]);


    console.log(isOnlinePlaying);
    useEffect(() => {
        if (isOnlinePlaying) {
            const boxid = `id${boxID}`;
            const roomDbRef = doc(db,"room",roomID?.toString());
            const unsub = onSnapshot(roomDbRef,{ includeMetadataChanges: true },(doc) => {
                const roomDb = doc.data();
                if (roomDb !== undefined) {
                    // if (roomDb.playerOne === null || roomDb.playerTwo === null) {
                    //     return;
                    // } else {
                    console.log(roomDb?.smallBox.boxid);
                    // }
                }
            });
        }
    });

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

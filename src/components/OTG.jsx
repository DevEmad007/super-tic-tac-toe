import Cell from './Cell';
import { useState,useEffect,useCallback } from 'react';
import useSkipRender from '../hooks/useSkipRender';
import { useGameContext } from '../hooks/useGameContext';
import { getFirestore,doc,updateDoc } from "firebase/firestore";
import { Chat,ChatBubbleOutlineOutlined,ChatOutlined,CircleOutlined,Close } from '@mui/icons-material';
import InGameModal from './modals/InGameModal';
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import ChatModal from './modals/ChatModal';

const OTG = () => {
    const screenWidth = screen.width;
    const db = getFirestore();
    const [ smallBox,setSmallBox ] = useState(Array(9).fill(null));
    const [ isHomeBtnClicked,setIsHomeBtnClicked ] = useState(false);
    const [ resetCell,setResetCell ] = useState(false);
    const [ cellID,setCellID ] = useState(null);
    const [ isChatModal,setIsChatModal ] = useState(false);
    const navigate = useNavigate();
    const [ showDot,setShowDot ] = useState(false);

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

    const {
        player,
        bigBox,
        setBigBox,
        XsTurn,
        setXsTurn,
        winner,
        setWinner,
        isDraw,
        setIsDraw,
        modalShow,
        setModalShow,
        nxtPlayBox,
        roomID,
        roomData,
        setIsOnlinePlaying,
    } = useGameContext();

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
        if (roomData !== undefined) {
            setBigBox(() => compareAndMergeArrays(bigBox,roomData.bigBox));
        }
    },[ nxtPlayBox,roomData?.bigBox ]);

    const handleReset = async () => {
        setBigBox(Array(9).fill(null));
        setResetCell(!resetCell);
        setModalShow(false);
        setWinner(null);
        setIsDraw(false);
        if (isHomeBtnClicked) {
            navigate('/');
            setIsOnlinePlaying(false);
        }
        setIsHomeBtnClicked(false);
        //closes modal and resets the game 
        const roomRef = doc(db,"room",roomID);
        try {
            await updateDoc(roomRef,{
                XsTurn: XsTurn,
                bigBox: Array(9).fill(null),
                isReset: true
            });
        } catch (error) {
            console.log(error);
        }
    };

    useCallback(() => {
        if (roomData?.isReset) {
            handleReset();
        }
    },[ roomData?.isReset ]);

    const handleClose = () => {
        setModalShow(false);
        setIsHomeBtnClicked(false);
        //closes modal without reset
    };

    const handleCellClick = (cell,cellID) => {
        if (cell === null) {
            setXsTurn(!XsTurn);
            setCellID(cellID);
            if (XsTurn) {
                setBigBox(prev => {
                    const newArray = [ ...prev ];
                    newArray[ cellID ] = 'X';
                    return newArray;
                });
            }
            else {
                setBigBox(prev => {
                    const newArray = [ ...prev ];
                    newArray[ cellID ] = 'O';
                    return newArray;
                });
            }
        }
    };

    const showChatModal = () => {
        setIsChatModal(true);
        setShowDot(false);
    };

    const hideChatModal = () => {
        setIsChatModal(false);
        setShowDot(false);
    };

    return (
        <div className='gameBoxTTT' >
            <ChatOutlined
                onClick={showChatModal}
                sx={{ position: 'absolute',right: '24px',bottom: '24px',fontSize: '34px' }}
            />
            <span className={showDot ? 'chatDotshow' : 'chatDotHide'} />
            <ChatModal
                setShowDot={setShowDot}
                hideChatModal={hideChatModal}
                show={isChatModal}
            />
            <InGameModal
                className='resetModal'
                winner={winner}
                show={modalShow}
                isDraw={isDraw}
                isHomeBtnClicked={isHomeBtnClicked}
                handleReset={handleReset}
                handleClose={handleClose}
                onHide={() => setModalShow(false)}
            />
            {/* prevent player from clicking other box then the next play box */}
            <div className='gameBox'>
                <div style={{ backgroundColor: 'transparent' }} className={`${XsTurn && player === "X" ? 'hidden' : !XsTurn && player === "O" ? 'hidden' : 'layer'}`}></div>
                {
                    bigBox.map(
                        (cell,index) =>
                            <div className={`cellT cell${index}`}
                                key={index}
                                onClick={() => handleCellClick(cell,index)}>
                                {cell == 'X' && <PlayerTwo
                                    active={true}
                                    fontsize={screenWidth > 600 ? '62px' : '89px'}
                                />}
                                {cell == 'O' && <PlayerOne
                                    active={true}
                                    fontsize={screenWidth > 600 ? '62px' : '79px'}
                                />}
                            </div>
                    )
                }
            </div>
            <div className='playerIndicator'>
                {
                    player === "X" ?
                        <PlayerTwo
                            className={'playertwo twoT'}
                            active={XsTurn}
                            anime={XsTurn}
                            fontsize={screenWidth > 600 ? '100px' : '100px'}
                        />
                        :
                        <PlayerOne
                            className={'playerone oneT'}
                            active={!XsTurn}
                            anime={!XsTurn}
                            fontsize={screenWidth > 600 ? '100px' : '100px'}
                        />
                }
            </div>
            <div className='gameBtns'>
                <Button className="goToHome" onClick={() => {
                    setModalShow(true);
                    setIsHomeBtnClicked(true);
                }}>Home</Button>
                <Button className="resetBtn" onClick={() => setModalShow(true)}>Reset</Button>
            </div>
        </div>
    );
};

export default OTG;

const PlayerOne = ({ active,fontsize,anime }) => {
    return <CircleOutlined sx={{ color: active ? '#1882FC' : 'gray',fontSize: fontsize,animation: anime ? 'popIcon 2s infinite' : '' }} />;
};

const PlayerTwo = ({ active,fontsize,anime }) => {
    return <Close sx={{ color: active ? '#c73866' : 'gray',fontSize: fontsize,animation: anime ? 'popIcon 2s infinite' : '' }} />;
};
import { useEffect,useState } from 'react';
import { PlayerOne,PlayerTwo } from "./Cell";
import InGameModal from "./modals/InGameModal";
import { Button } from "react-bootstrap";
import { useGameContext } from "../hooks/useGameContext";
import { useNavigate } from "react-router-dom";
import OnlineSmallBox from "./OnlineSmallBox";
;

const OnlineGame = () => {
    const [ smallBoxes,setSmallBoxes ] = useState(Array(9).fill(Array(9).fill(null)));
    const [ resetCell,setResetCell ] = useState(false);
    const [ isHomeBtnClicked,setIsHomeBtnClicked ] = useState(false);
    const navigate = useNavigate();
    const screenWidth = screen.width;

    const {
        bigBox,
        setBigBox,
        XsTurn,
        winner,
        setWinner,
        modalShow,
        setModalShow,
        setNxtPlayBox,
        setIsOnlinePlaying,
        roomData,
    } = useGameContext();

    const handleReset = () => {
        setBigBox(Array(9).fill(null));
        setResetCell(!resetCell);
        setNxtPlayBox(null);
        setModalShow(false);
        setWinner(null);
        if (isHomeBtnClicked) {
            navigate('/');
            setIsOnlinePlaying(false);
        }
        setIsHomeBtnClicked(false);
        //closes modal and resets the game 
    };

    const handleClose = () => {
        setModalShow(false);
        setIsHomeBtnClicked(false);
        //closes modal without reset
    };

    useEffect(() => {
        let newArray = [];
        if (roomData !== undefined || null) {
            const smallBosesRef = roomData.smallBox;
            newArray.push(smallBosesRef.id0);
            newArray.push(smallBosesRef.id1);
            newArray.push(smallBosesRef.id2);
            newArray.push(smallBosesRef.id3);
            newArray.push(smallBosesRef.id4);
            newArray.push(smallBosesRef.id5);
            newArray.push(smallBosesRef.id6);
            newArray.push(smallBosesRef.id7);
            newArray.push(smallBosesRef.id8);
            // setBigBox(roomData.bigBox);
        }
        setSmallBoxes(newArray);
    },[ XsTurn ]);

    // console.log(smallBoxes);
    // console.log(roomData);

    return (
        <div style={{ backgroundColor: XsTurn ? '#c4302b' : '#1882FC' }} className={`gameboard`}>

            <Button className="resetBtn" onClick={() => setModalShow(true)}>Reset</Button>
            <InGameModal
                className='resetModal'
                winner={winner}
                show={modalShow}
                isHomeBtnClicked={isHomeBtnClicked}
                handleReset={handleReset}
                handleClose={handleClose}
                onHide={() => setModalShow(false)}
            />
            <div className="player">
                <PlayerOne
                    className={'playerone'}
                    active={false}
                    fontsize={screenWidth > 600 ? '100px' : '66px'}
                />
            </div>
            <div className="game">
                {
                    smallBoxes.map((value,index) =>
                        < OnlineSmallBox
                            bigBoxValue={value}
                            id={index}
                            resetCell={resetCell}
                            key={index}
                        />
                    )
                }
                {/* maps gameBoxes */}
            </div>
            <div className="player">
                <PlayerTwo
                    className={'playertwo'}
                    active={false}
                    fontsize={screenWidth > 600 ? '100px' : '66px'}
                />
            </div>
            <Button className="goToHome" onClick={() => {
                setModalShow(true);
                setIsHomeBtnClicked(true);
            }}>Home</Button>
        </div>
    );
};

export default OnlineGame;
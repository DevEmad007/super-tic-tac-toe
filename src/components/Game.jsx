import GameBox from "./GameBox";
import { useState } from 'react';
import { PlayerOne,PlayerTwo } from "./Cell";
import BootstrapModal from "./BootstrapModal";
import { Button } from "react-bootstrap";
import { useGameContext } from "../hooks/useGameContext";
import { useNavigate } from "react-router-dom";

const Game = () => {
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
        setNxtPlayBox
    } = useGameContext();

    const handleReset = () => {
        setBigBox(Array(9).fill(null));
        setResetCell(!resetCell);
        setNxtPlayBox(null);
        setModalShow(false);
        setWinner(null);
        if (isHomeBtnClicked) {
            navigate('/');
        }
        setIsHomeBtnClicked(false);
        //closes modal and resets the game 
    };

    const handleClose = () => {
        setModalShow(false);
        setIsHomeBtnClicked(false);
        //closes modal without reset
    };

    return (
        <>
            <Button className="resetBtn" onClick={() => setModalShow(true)}>Reset</Button>
            <BootstrapModal
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
                    active={!XsTurn}
                    fontsize={screenWidth > 600 ? '100px' : '66px'}
                />
            </div>
            <div className="game">
                {
                    bigBox.map((value,index) =>
                        < GameBox
                            bigBoxValue={value}
                            id={index}
                            resetCell={resetCell}
                            key={index}
                        />
                    )
                }
                {/* maps out gameBoxes */}
            </div>
            <div className="player">
                <PlayerTwo
                    className={'playertwo'}
                    active={XsTurn}
                    fontsize={screenWidth > 600 ? '100px' : '66px'}
                />
            </div>
            <Button className="goToHome" onClick={() => {
                setModalShow(true);
                setIsHomeBtnClicked(true);
            }}>Home</Button>
        </>
    );
};

export default Game;

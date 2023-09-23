import GameBox from "./GameBox";
import { useState } from "react";

const Game = () => {
    const [ bigBox,setBigBox ] = useState(Array(9).fill(null));
    const [ XsTurn,setXsTurn ] = useState(true);
    const [ trigerRender,setTrigerRender ] = useState(1);

    return (
        <div className="game">
            {
                bigBox.map((value,index) =>
                    < GameBox
                        XsTurn={XsTurn}
                        setXsTurn={setXsTurn}
                        id={index}
                        setTrigerRender={setTrigerRender}
                        key={index}
                    />
                )
            }

        </div>
    );
};

export default Game;

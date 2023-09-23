import { CancelPresentation,Circle,CircleOutlined,Close } from '@mui/icons-material';
import React from 'react';

const PlayerOne = () => {
    return <CircleOutlined />;
};

const PlayerTwo = () => {
    return <Close />;
};

const Cell = ({ children,handleClick }) => {
    return (
        <div className='cell'
            onClick={handleClick}>
            {children == 'X' && <PlayerTwo />}
            {children == 'O' && <PlayerOne />}
        </div>
    );
};

export default Cell;

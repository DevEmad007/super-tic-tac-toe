import { CancelPresentation,Circle,CircleOutlined,Close } from '@mui/icons-material';
import React from 'react';

export const PlayerOne = ({ active,fontsize }) => {
    return <CircleOutlined sx={{ color: active ? '#1882FC' : 'gray',fontSize: fontsize }} />;
};

export const PlayerTwo = ({ active,fontsize }) => {
    return <Close sx={{ color: active ? '#c73866' : 'gray',fontSize: fontsize }} />;
};

const Cell = ({ children,handleClick }) => {
    const screenWidth = screen.width;

    return (
        <div className='cell'
            onClick={handleClick}>
            {children == 'X' && <PlayerTwo
                active={true}
                fontsize={screenWidth > 600 ? '56px' : '28px'}
            />}
            {children == 'O' && <PlayerOne
                active={true}
                fontsize={screenWidth > 600 ? '56px' : '28px'}
            />}
        </div>
    );
};

export default Cell;

import React from 'react';
import { Button } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

const Tiutorial = () => {
    return (
        <div className='tutorial'>
            <Link to={'/'}>
                <Button>
                    Home
                </Button>
            </Link>
            <ReactPlayer playing pip={true} className={'vidPlayer'} url={'https://www.youtube.com/shorts/_Na3a1ZrX7c'}></ReactPlayer>
        </div>
    );
};

export default Tiutorial;

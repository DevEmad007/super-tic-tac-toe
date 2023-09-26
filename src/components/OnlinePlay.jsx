import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const OnlinePlay = () => {
    return (
        <div className='online'>
            <h1>Will be added Soon</h1>
            <Link to={'/game'}>
                <Button>
                    Play offline with friend
                </Button>
            </Link>
        </div>
    );
};

export default OnlinePlay;

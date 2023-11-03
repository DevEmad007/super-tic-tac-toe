import { Close,CloseOutlined } from '@mui/icons-material';
import { Button,Input,Box,Typography,Modal,ButtonBase } from '@mui/material';
import React,{ useState } from 'react';

const ChatModal = ({ show,hideChatModal }) => {
    const [ sentMessage,setSentMessage ] = useState('');

    const handleChange = (e) => {
        setSentMessage(e.target.value);
    };

    const handleSent = () => {

    };

    return (
        <div
            style={{ backgroundColor: "rgba(0, 0, 0, 0.43)" }}
            className={`chatModal ${show ? 'showChatModal' : 'hideChatModal'}`}

        >
            <Close
                onClick={hideChatModal}
                sx={{ position: 'absolute',top: '20px',right: '20px',fontSize: '30px',color: 'red' }}
            />
            <div className={` chatHeader ${show ? 'showInput' : 'hideInput'}`}>
                <h2 style={{ color: 'gary' }}>Chat</h2>
            </div>
            <div className='chatContainer'>
                <ul>
                    <li>sdnv</li>
                    <li className='chatRight'>sdnv</li>
                    <li>sdnv</li>
                    <li>sdnv</li>
                    <li>sdnv</li>
                    <li>sdnv</li>
                    <li>sdnv</li>
                    <li>sdnv</li>
                    <li>sdnv</li>
                    <li>sdnv</li>
                    <li>sdnv</li>
                    <li>sdnv</li>
                    <li>sdnv</li>
                    <li>sdnv</li>
                    <li>sdnv</li>
                    <li>sdnv</li>
                </ul>
            </div>
            <div className={` inputContainer ${show ? 'showInput' : 'hideInput'}`}>
                <input
                    value={sentMessage}
                    onChange={(e) => handleChange(e)}
                    type="text"
                />
                <ButtonBase
                    onClick={handleSent}
                >
                    Sent
                </ButtonBase>
            </div>
        </div>

    );
};

export default ChatModal;
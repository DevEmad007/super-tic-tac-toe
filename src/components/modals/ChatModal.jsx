import { Close } from '@mui/icons-material';
import { ButtonBase } from '@mui/material';
import React,{ useEffect,useMemo,useState } from 'react';
import { useGameContext } from '../../hooks/useGameContext';
import { getFirestore,doc,setDoc,updateDoc,onSnapshot,onSnapshotsInSync,arrayUnion } from "firebase/firestore";
import { getChatData } from '../../API/updateRoom';
import useSkipRender from '../../hooks/useSkipRender';

const ChatModal = ({ show,hideChatModal }) => {
    const db = getFirestore();
    const {
        player,
        roomID,
    } = useGameContext();
    const roomRef = doc(db,"roomChat",roomID);
    const [ chats,setChats ] = useState([]);
    const [ chatsData,setChatsData ] = useState([]);
    const [ chatDetail,setChatDetail ] = useState({
        from: player,
        text: '',
    });

    const handleChange = (e) => {
        setChatDetail({
            ...chatDetail,
            text: e.target.value
        });
    };

    const handleSent = async () => {
        setChats([ ...chats,chatDetail ]);
        const data = {
            chats: [ chatDetail ]
        };
        try {
            await updateDoc(roomRef,{
                chats: arrayUnion(chatDetail)
            });
        } catch (error) {
            console.log(error);
            try {
                setDoc(roomRef,data);
            } catch (error) {
                console.log(error);
            }
        }
        setChatDetail({
            ...chatDetail,
            text: ''
        });
    };

    useMemo(() => {
        if (roomID !== '' || undefined) {
            getChatData(roomID,setChatsData);
        }
    },[ roomID ]);

    useSkipRender(() => {
        setChats(() => {
            if (chats.length > chatsData.length) {
                return chats;
            } else {
                return chatsData;
            }
        });
    },[ chatsData ]);

    return (
        <div
            className={`chatModal ${show ? 'showChatModal' : 'hideChatModal'}`}

        >
            <Close
                onClick={hideChatModal}
                sx={{ position: 'absolute',top: '25px',right: '24px',fontSize: '30px',color: '' }}
            />
            <div className={` chatHeader ${show ? 'showInput' : 'hideInput'}`}>
                <h2 style={{ color: 'gary' }}>Chat</h2>
            </div>
            <div className='chatContainer'>
                <ul>
                    {
                        chats?.length >= 1 &&
                        chats.map((e,i) => (
                            <li key={i} className={`${e?.from === player ? 'chatRight' : 'chatLeft'}`} >
                                {e?.text}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className={` inputContainer ${show ? 'showInput' : 'hideInput'}`}>
                <input
                    name='input'
                    value={chatDetail.text}
                    onChange={(e) => handleChange(e)}
                    placeholder='Send a Message'
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
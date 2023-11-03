import { getFirestore,doc,onSnapshot } from "firebase/firestore";

export const getRoomData = (roomID,setRoomData,setXsTurn,setNxtPlayBox,setSmallBoxID,setCellid) => {
    const db = getFirestore();
    onSnapshot(
        doc(db,"room",roomID.toString()),
        { includeMetadataChanges: true },
        (doc) => {
            const data = doc.data();
            setRoomData(doc.data()); //sets room data to local storage
            setXsTurn(data.XsTurn);
            setNxtPlayBox(data.nxtPlayBox);
            setSmallBoxID(data.smallBoxID);
            setCellid(data.cellid);
        });
};

export const getChatData = (roomID,setChatsData) => {
    const db = getFirestore();
    onSnapshot(
        doc(db,"roomChat",roomID),
        { includeMetadataChanges: true },
        (doc) => {
            const data = doc.data();
            if (data !== undefined) {
                setChatsData(data.chats);
            }
        });
};
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
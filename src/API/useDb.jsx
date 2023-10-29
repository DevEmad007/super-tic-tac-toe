import { getFirestore,doc,setDoc,getDocs,updateDoc,collection,query,where } from "firebase/firestore";
import { } from 'firebase/firestore';
import useAuth from "./useAuth";
import { useState } from "react";

const useDb = () => {
    const db = getFirestore();
    const { userUID } = useAuth();
    const [ isRoomRefEmpty,setIsRoomRefEmpty ] = useState(false);


    const createRoom = async (roomID) => {
        const dbRef = doc(db,"room",userUID);
        const roomData = {
            roomID: roomID.toString(),
            otherUser: null,
            bigBox: [],
            smallBox: []
        };
        try {
            await setDoc(dbRef,roomData);
        } catch (error) {
            console.log(error);
        }
    };

    const updateBigBox = () => {

    };

    const joinRoom = async (roomID) => {
        const RoomRef = collection(db,"room");
        const q = query(RoomRef,where("roomID","==",roomID.toString()));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.docs?.map(i => {
                console.log(i.data());
            });
            setIsRoomRefEmpty(querySnapshot.empty);
        } catch (error) {
            console.log(error);
        }
    };

    return { createRoom,updateBigBox,joinRoom };
};

export default useDb;

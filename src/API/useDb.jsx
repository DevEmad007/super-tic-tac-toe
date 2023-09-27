import { getDatabase,ref,set } from "firebase/database";

const useDb = () => {
    const db = getDatabase();

    function writeUserData() {
        set(ref(db,'users/' + 'userId'),{
            username: 'name',
            email: 'email',
            profile_picture: 'imageUrl'
        });
    }
    return { writeUserData };
};

export default useDb;

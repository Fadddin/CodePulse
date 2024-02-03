import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Profile = () => {

    const { user } = useSelector(
        (state: RootState) => state.userReducer
    );

    return (
        <div>
            <div className="flex justify-center items-center">
                <p className="flex m-1">Email: {user?.email}</p>
            </div>

            <div className="flex justify-center items-center">
                <p className="flex m-1">Name: {user?.name}</p>
            </div>
            
        </div>
    )
}

export default Profile;
import { Link } from "react-router-dom";
import { User } from "../types/types";
import { useDispatch } from "react-redux";
import axios from "axios";
import { userNotExist } from "../redux/reducer/userReducer";
import Intro from "./Intro";

interface PropsType {
    user: User | null;
}

const Header = ({ user }: PropsType) => {

    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const { data }: any = await axios.get("http://localhost:7070/api/v1/user/logout", { withCredentials: true });
            console.log(data);
            dispatch(userNotExist());
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div>
                <div className="flex px-4 justify-between bg-gradient-to-r from-indigo-700 via-violet-600 to-purple-800 h-16">
                    <div className="text-2xl flex m-2 items-center font-bold text-white">

                        <Link to="/">MEDECODE</Link>
                    </div>
                    <div className="flex items-center">
                        {
                            user ? (
                                <div className="flex gap-4">
                                    <p className="text-white items-center flex text-lg"><Link to="/profile">{user.name}</Link></p>
                                    <button onClick={handleLogout} className="rounded-md bg-black text-xs uppercase text-white px-4 py-2">Logout</button>
                                </div>
                            ) : (
                                <div>
                                    <Link to="/login">Login</Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <Intro />

        </div>
    );
};

export default Header;

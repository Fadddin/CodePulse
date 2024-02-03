import { Link } from "react-router-dom";
import { User } from "../types/types";
import { useDispatch } from "react-redux";
import axios from "axios";
import { userNotExist } from "../redux/reducer/userReducer";

interface PropsType {
    user: User | null;
}

const Header = ({ user }: PropsType,) => {

    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const {data}: any = await axios.get("http://localhost:7000/api/v1/user/logout", { withCredentials: true });
            console.log(data);
            dispatch(userNotExist());
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Link to="/">LOGO</Link>
            {
                user ? (
                    <div>
                        <p>{user.name}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div>
                        <button><Link to="/login">Login</Link></button>
                    </div>
                )
            }
        </div>
    );
};

export default Header;

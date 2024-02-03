import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userExist, userNotExist } from "../redux/reducer/userReducer";

const Login = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const loginData = {
            email,
            password
        }
        try {
            const {data}: any = await axios.post("http://localhost:7070/api/v1/user/login", loginData, { withCredentials: true });
            dispatch(userExist(data.user));
            console.log(data)
        } catch (error) {
            console.log(error)
            dispatch(userNotExist());
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder="enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;
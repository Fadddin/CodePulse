import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userExist, userNotExist } from "../redux/reducer/userReducer";

const Register = () => {

    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const registerData = {
            name,
            email,
            password
        }
        try {
            const {data}: any = await axios.post("http://localhost:7070/api/v1/user/register", registerData, { withCredentials: true });
            dispatch(userExist(data.user));
            console.log(data);
        } catch (error) {
            console.log(error)
            dispatch(userNotExist());
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="enter name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="text" placeholder="enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder="enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;
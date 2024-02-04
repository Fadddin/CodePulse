import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userExist, userNotExist } from "../redux/reducer/userReducer";
import { Link, useNavigate } from "react-router-dom"; 

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            navigate("/profile")
        } catch (error) {
            console.log(error)
            dispatch(userNotExist());
        }
    }

    return (
        <div>
            {/* <h1>Loin</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"  placeholder="enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                
                <button type="submit">Login</button>
            </form> */}
            <div className="flex justify-center items-center">
            <h1 className="text-3xl font-semibold mt-8 text-slate-600">SIGN IN</h1>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6" method="POST">
                <div>
                <div className="py-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
                    <div className="mt-2">
                    <input type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"  placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                </div>
                <div className="py-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
                    <div className="mt-2">
                    <input type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    
                </div>
                

                <div className="flex justify-center items-center">
                     <button className="bg-indigo-600 px-4 text-white rounded py-2 m-4" type="submit">Sign in</button>
                </div>

                <div className="flex justify-center items-center">
                    <p>Don't have an account ? <Link to="/register" className="text-blue-600">Register</Link> </p>
                    
                </div>
                
                
                
                </div>
            </form>
        </div>
        </div>
    )
}

export default Login;
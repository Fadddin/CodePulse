import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { userExist, userNotExist } from "./redux/reducer/userReducer";

import Header from "./components/header";
import Loader from "./components/loader";
import ProtectedRoute from "./components/protected-route";
import axios from "axios";

const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const NotFound = lazy(() => import("./pages/not-found"));
const Profile = lazy(() => import("./pages/profile"));
const Dash = lazy(() => import ("./pages/dash"));

const App = () => {

    const { user, loading } = useSelector(
        (state: RootState) => state.userReducer
    );

    const dispatch = useDispatch();

    const gotUser = async () => {
        try {
            const { data }: any = await axios.get("http://localhost:7000/api/v1/user/me", { withCredentials: true });
            dispatch(userExist(data.user));
            console.log(data)
        } catch (error: any) {
            dispatch(userNotExist());
        }
    }

    useEffect(() => {
        gotUser();
    }, []);

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <BrowserRouter>
                    <Header user={user} />
                    <Suspense fallback={<Loader />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            {/* Not logged In Route */}
                            <Route
                                path="/login"
                                element={
                                    <ProtectedRoute isAuthenticated={user ? false : true}>
                                        <Login />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/register"
                                element={
                                    <ProtectedRoute isAuthenticated={user ? false : true}>
                                        <Register />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Logged In User Routes */}
                            <Route
                                element={<ProtectedRoute isAuthenticated={user ? true : false} />}
                            >
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/dash" element={<Dash />} />
                            </Route>

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            )}
        </div>
    )
}

export default App;
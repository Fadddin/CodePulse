// import { Link } from 'react-router-dom';
import { User } from "../types/types";
import Dash from '../components/dash';

interface PropsType {
    user: User | null;
}

const Home = ({ user }: PropsType) => {
    return (
        <div>
            {user ? (
                <Dash/>
            ) : (
                <div className="flex justify-center items-center">
                    <p className="relative w-[max-content] font-mono
before:absolute before:inset-0 before:animate-typewriter
before:bg-white
after:absolute after:inset-0 after:w-[0.125em] after:animate-caret
after:bg-black text-lg">Login to Get Started</p>
                </div>
            )}
        </div>
    )
}

export default Home;
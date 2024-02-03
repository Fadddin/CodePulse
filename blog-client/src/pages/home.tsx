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
                <Dash />
            ) : (
                <button>Login</button>
            )}
        </div>
    )
}

export default Home;
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            Home
            <Link to="/profile">Profile</Link>
            <Link to="/dash">DashBoard</Link>
        </div>
    )
}

export default Home;
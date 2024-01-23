import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div>
            Home Page<br/>
            <Link to='/chat'>chat</Link>
        </div>
    );
};

export default Home;
import { Link, useNavigate } from 'react-router-dom';




const Header = () => {

    const navigate = useNavigate();

    const handleLogoutButton = e => {
        e.preventDefault();
        localStorage.removeItem('logged_in_user');
        navigate('/login');
    };


    return (<div className="topnav">

        <Link to="/edit_user">Profile</Link>
        <Link to="/create_advertisment">Create advertisment</Link>
        <Link to="/update_advertisment">Update advertisment</Link>
        <Link to="/user_ads">Your advertisments</Link>
        <Link to="/all_advertisments"> All advertisments</Link>
        <Link to="/locations"> All locations </Link>
        <Link onClick={handleLogoutButton} to="/login">Logout</Link>

    </div>);

};

export default Header;
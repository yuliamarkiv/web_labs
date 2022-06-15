import React , {useState, useEffect}  from 'react';
import { useNavigate , Navigate} from 'react-router-dom';
import { encode as base64_encode, decode as base64_decode } from 'js-base64';
import Header from './header';
const EditUser = ()  => {
    const backendUrl = "http://127.0.0.1:5000/api/v1/user/"

    const navigation = useNavigate();

    const [userData, setUserData] = useState({
        name: '',
        username: '',
        email: '',
        locationId: '',
        password: '',
        confirmPassword: '',
    });

    const [loggedInUser, setLoggedInUser] = useState(
        localStorage.getItem('logged_in_user')
    );

    const [errorMessage, setErrorMessage] = useState('');

    function getUser() {
        let username = base64_decode(loggedInUser)
            .split(':')[0];
        const headers = new Headers();
        headers.set('Authorization', `Basic ${localStorage.getItem('logged_in_user')}`);
        headers.set('content-type', 'application/json');
        fetch(backendUrl + username, {
            method: 'GET',
            headers,
        })
            .then(async (response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(await response.text());
                }
            })
            .then((data) => {
                setUserData({
                    ...userData,
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    locationId: data.locationId,
                    password: base64_decode(loggedInUser)
                        .split(':')[1],
                    confirmPassword: base64_decode(loggedInUser)
                        .split(':')[1],
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        getUser();
    }, []);

    const handleChange = e => {
        setErrorMessage(null);
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const deleteButtonHandler = event => {
        event.preventDefault();

        const username = base64_decode(loggedInUser)
            .split(':')[0];
        const headers = new Headers();
        headers.set('Authorization', `Basic ${localStorage.getItem('logged_in_user')}`);
        headers.set('content-type', 'application/json');
        fetch(backendUrl + username, {
            method: 'DELETE',
            headers,
        })
        .then(async (response) => {
            if (response.status !== 200) {
                throw new Error(await response.text());
            }
            return response.text();
            })
               .then(() => {
                window.localStorage.removeItem('logged_in_user');
                setLoggedInUser(null);
                navigation('/login');
            })
            .catch((error) => {
                let errorMessage = JSON.parse(error.message).message;
                setErrorMessage(errorMessage);
            });
    };

    const saveButtonHandler = event => {
        event.preventDefault();
        const username = base64_decode(loggedInUser)
            .split(':')[0];
        setErrorMessage(null);

        if (userData.password !== userData.confirmPassword) {
            setErrorMessage('Password are not the same');
            return;

        }

        const data = {
            name: userData.name,
            username: userData.username,
            email: userData.email,
            locationId: userData.locationId,
            password: userData.password,
            confirmPassword: userData.confirmPassword
        };

        const headers = new Headers();
        headers.set('content-type', 'application/json');
        headers.set('Authorization', `Basic ${localStorage.getItem('logged_in_user')}`);
        fetch(backendUrl + username, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers,
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(await response.text());
                }
                const hash = base64_encode(`${data.username}:${data.password}`);
                localStorage.setItem('logged_in_user', hash);
                setLoggedInUser(hash);
                window.location.reload()
            })
            .catch((error) => {
                let errorMessage = JSON.parse(error.message).message;
                setErrorMessage(errorMessage);
            });
    };

    if (!localStorage.getItem('logged_in_user')) {
        return <Navigate to="/login"/>;
    }


    return (
         <div> <Header/> 
        <div className="container_registration">
        <div className="title">Change your information</div>
        <form className="form" name ="form" >
            <div className="user-details">
                <div className="input-box">
                    <span className="details">Edit Full Name</span>
                    <input className="name" type="text" placeholder="Enter your full name"  name="name" onChange={handleChange}  value={userData.name} />
                </div>
                <div className="input-box">
                    <span className="details">Edit Username</span>
                    <input className="username" type="text" placeholder="Enter your username" name="username" onChange={handleChange} value={userData.username} />
                </div>
                <div className="input-box">
                    <span className="details">Edit Email</span>
                    <input className="email" type="text" placeholder="Enter your email" name="email" onChange={handleChange} value={userData.email}/>
                </div>
                <div className="input-box">
                    <span className="details">Edit Location</span>
                    <input className="locationId" type="text" placeholder="Enter your location" name="locationId" onChange={handleChange}/>
                </div>
                <div className="input-box">
                    <span className="details">Edit Password</span>
                    <input className="password" type="password" placeholder="Enter your password" name="password" onChange={handleChange}  value ={userData.password} />
                </div>
                <div className="input-box">
                    <span className="details">Confirm Password</span>
                    <input className="confirm_password" type="password" placeholder="Confirm your password" onChange={handleChange} />
                </div>
                
            </div>
            {errorMessage && <div id="error-message">{errorMessage }</div>}
        </form>
        <div className="section-three" role="buttons">
            <div className="Submit">
              <button id="loginButton" onClick={saveButtonHandler} name="submit">Submit</button>
              <div className="space"> </div>
              <button id = "deleteButton" onClick={deleteButtonHandler} name="delete">Delete account</button>
        </div>
        </div>
    </div>
    </div>
      );
    };
export default EditUser;
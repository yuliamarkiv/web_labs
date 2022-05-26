import React , {useState, useEffect}  from 'react';
import { useNavigate , Navigate} from 'react-router-dom';
import { encode as base64_encode, decode as base64_decode } from 'js-base64';
const EditUser = ()  => {
    const backendurl = 'http://127.0.0.1:5000/api/v1/user/'
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name:'',
        username: '',
        email: '',
        locationId: '',
        password: '',
        confirm_password: ''

    });
    const [logged_in, setLogged_in] = useState(
        localStorage.getItem('logged_in_user')
    );
    const [errorMessage, setErrorMessage] = useState('');
    function getUser() {
        let username = base64_decode(logged_in)
            .split(':')[0];
        const headers = new Headers();
        headers.set('Authorization', `Basic ${localStorage.getItem('logged_in_user')}`);
        headers.set('content-type', 'application/json');
        fetch(backendurl + username, {
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
                setUser({
                    ...user,
                    name: data.name,
                    locationId: data.locationId,
                    password: base64_decode(logged_in)
                        .split(':')[1],
                    confirm_password: base64_decode(logged_in)
                        .split(':')[1],
                });
            })
            .catch(error => {
                console.log(error);

            });
    }
   
    useEffect(() => {
        getUser();
         // eslint-disable-next-line
    }, []);

    const handleChange = e => {
        setErrorMessage(null);
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    const handleLogoutButton = e => {
        e.preventDefault();
        localStorage.removeItem('logged_in_user');
        navigate('/login');
    };

    const deleteButtonHandler = event => {
        event.preventDefault();

        const username = base64_decode(logged_in)
            .split(':')[0];
        const headers = new Headers();
        headers.set('Authorization', `Basic ${localStorage.getItem('logged_in_user')}`);
        headers.set('content-type', 'application/json');
        fetch(backendurl + username, {
            method: 'DELETE',
            headers,
        })
            .then(() => {
                window.localStorage.removeItem('logged_in_user');
                setLogged_in(null);
            })
            .catch((error) => {
                let errorMessage = error.message;
                setErrorMessage(errorMessage);
            });
    };

    const saveButtonHandler = event => {
        event.preventDefault();
        const username = base64_decode(logged_in)
            .split(':')[0];
        setErrorMessage(null);

        if (user.password !== user.confirm_password) {
            setErrorMessage('Password are not the same');
            return;

        }

        const data = {
            name: user.name,
            locationId: user.locationId,
            password: user.password,
            confirm_password: user.confirm_password
        };

        const headers = new Headers();
        headers.set('content-type', 'application/json');
        headers.set('Authorization', `Basic ${localStorage.getItem('logged_in_user')}`);
        console.log(data)
        fetch(backendurl + username, {
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
                setLogged_in(hash);
                navigate('/login');
            })
            .catch((error) => {
                console.log(error)
                let errorMessage = error.message;
                setErrorMessage(errorMessage);
            });
    };

    if (!localStorage.getItem('logged_in_user')) {
        return <Navigate to="/login"/>;
    }

    return (
        <div class="container_registration">
        <div class="title">Change your information</div>
        <div class="form" >
            <div class="user-details">
                <div class="input-box">
                    <span class="details">Edit Full Name</span>
                    <input name="name" type="text" placeholder="Enter your full name" onChange={handleChange}/>
                </div>
                <div class="input-box">
                    <span class="details">Edit Username</span>
                    <input name="username" type="text" placeholder="Enter your username" onChange={handleChange} value={user.username} />
                </div>
                <div class="input-box">
                    <span class="details">Edit Email</span>
                    <input name="email" type="text" placeholder="Enter your email" onChange={handleChange} value = {user.email} required/>
                </div>
                <div class="input-box">
                    <span class="details">Edit Location</span>
                    <input name="locationId" type="text" placeholder="Enter your location" onChange={handleChange}/>
                </div>
                <div class="input-box">
                    <span class="details">Edit Password</span>
                    <input name="password" type="password" placeholder="Enter your password" onChange={handleChange} required/>
                </div>
                <div class="input-box">
                    <span class="details">Confirm Password</span>
                    <input name="confirm_password" type="password" placeholder="Confirm your password" onChange={handleChange} required/>
                </div>
                
            </div>
            {errorMessage && <div id="error-message">{errorMessage }</div>}
        </div>
        <div class="section-three">
            <div class="Submit">
              <button id="loginButton" onClick={saveButtonHandler}>Submit</button>
              <button id="logout_button" onClick={handleLogoutButton}>Logout</button>
        </div>
        </div>
        <div class ="section-four">
            <button id = "deleteButton" onClick={deleteButtonHandler}>Delete account</button>
        </div>
    </div>
      );
    };
export default EditUser;
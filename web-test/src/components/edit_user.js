import React , {useState, useEffect}  from 'react';
import { useNavigate , Navigate} from 'react-router-dom';
import { encode as base64_encode, decode as base64_decode } from 'js-base64';
import Header from './header';
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
                    username: data.username,
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
            username: user.username,
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
                console.log('1')
                setLogged_in(hash);
                navigate('/login');
            })
            .catch((error) => {
                console.log(error)
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
        <div className="form" >
            <div className="user-details">
                <div className="input-box">
                    <span className="details">Edit Full Name</span>
                    <input className="name" type="text" placeholder="Enter your full name" onChange={handleChange} value = {user.name} />
                </div>
                <div className="input-box">
                    <span className="details">Edit Username</span>
                    <input className="username" type="text" placeholder="Enter your username" onChange={handleChange} value = {user.username}/>
                </div>
                <div className="input-box">
                    <span className="details">Edit Email</span>
                    <input className="email" type="text" placeholder="Enter your email" onChange={handleChange}/>
                </div>
                <div className="input-box">
                    <span className="details">Edit Location</span>
                    <input className="locationId" type="text" placeholder="Enter your location" onChange={handleChange}/>
                </div>
                <div className="input-box">
                    <span className="details">Edit Password</span>
                    <input className="password" type="password" placeholder="Enter your password" onChange={handleChange} required/>
                </div>
                <div className="input-box">
                    <span className="details">Confirm Password</span>
                    <input className="confirm_password" type="password" placeholder="Confirm your password" onChange={handleChange} required/>
                </div>
                
            </div>
            {errorMessage && <div id="error-message">{errorMessage }</div>}
        </div>
        <div className="section-three">
            <div className="Submit">
              <button id="loginButton" onClick={saveButtonHandler}>Submit</button>
              <div className="space"> </div>
              <button id = "deleteButton" onClick={deleteButtonHandler}>Delete account</button>
        </div>
        </div>
    </div>
    </div>
      );
    };
export default EditUser;
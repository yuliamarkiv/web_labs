import React , {useState} from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { encode as base64_encode } from 'js-base64';
const Login = () => {
  const backendurl = 'http://127.0.0.1:5000/api/v1/auth/login';
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const createAccount = () => {
      navigate("/register");
  }
  const [user, setUser] = useState({
		username: "",
		password: ""
	});
  const handleChange = e => {
    // console.log(e);
    setErrorMessage(null);
    setUser({
        ...user,
        [e.target.name]: e.target.value
    });
};
const loginButtonHandler = event => {
  event.preventDefault();

  const hash = base64_encode(`${user.username}:${user.password}`);
  const headers = new Headers();
  headers.set('content-type', 'application/json');
  fetch(backendurl, {
      method: 'POST',
      body: JSON.stringify(user),
      headers,
  })
      .then(async (response) => {
          if (response.status !== 200) {
              throw new Error(await response.text());
          }
          return response.text();
      })
      .then(() => {
          // console.log('1')
          window.localStorage.setItem('logged_in_user', hash);
          navigate('/edit_user');
      })
      .catch((error) => {
          // console.log(error)
          let errorMessage = error.message
          setErrorMessage(errorMessage);
      });
};
if (localStorage.getItem('logged_in_user')){
  console.log('logged_in_user')
  return <Navigate to="/edit_user"/>;
}
    return (
      <div className="container">
      <div className="section-one">
       <div className="title">
           <h1>Login</h1>
       </div>
        <form  className="main-form" onSubmit={loginButtonHandler}>
          <input type="text" name = "username" placeholder="Username" 
								onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" 
								onChange={handleChange}/>
          
          <button className="loginButton" onClick = {loginButtonHandler} type='submit'>Login</button>
          {errorMessage && <div id="error-message">{errorMessage}</div>}
          </form>
      </div>
      <div className="section-two">
        <div className="new-account">
        
          <button onClick={createAccount}>Create New Account</button>
        </div>
      </div>
      
    </div>
    );
  }
export default Login;
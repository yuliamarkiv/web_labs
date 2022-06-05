import React , {useState}from 'react';
import { useNavigate,Navigate } from 'react-router-dom';
const Register = () => {
   const backendurl = "http://127.0.0.1:5000/api/v1/user"
   const navigate = useNavigate();
   const [errorMessage,setErrorMessage] = useState('');
   const [user,setUser] = useState({
    name: '',
    username: '',
    email: '',
    locationId: '',
    password: '',
    confirm_password: '',
   });
   const handleChange = e => {
    //  console.log(e);
     setErrorMessage(null);
     setUser({
       ...user,
       [e.target.name]: e.target.value
     });
   };
   const handleSubmit = event =>{
     event.preventDefault();
     console.log(user);
     if (user.confirm_password !== user.password) {
      setErrorMessage('Password are not the same');
      return;
    }
   const headers = new Headers();
   headers.set('content-type', 'application/json');
   fetch(backendurl,{
     method: 'POST',
     body: JSON.stringify(
       {
         name: user.name,
         username: user.username,
         email: user.email,
         locationId: user.locationId,
         password: user.password
       }
     ),
     headers,
   })
   .then(async (response) => {
    if (response.status !== 200) {
        throw new Error(await response.text());
    }
    return response.text();
    })
    .then(() => {
        navigate('/login');
    })
    .catch((error) => {
        let errorMessage = JSON.parse(error.message).message;
        setErrorMessage(errorMessage);
    });
    };
    if (localStorage.getItem('logged_in_user')){
      return <Navigate to="/advertisments"/>;
    }
    return (
      <div className="container_registration">
      <div className="title">Registration</div>
      <form className="form" onSubmit={handleSubmit}  name="form">
          <div className="user-details">
              <div className="input-box">
                  <span className="details">Full Name</span>
                  <input name="name" type="text" placeholder="Enter your name" required onChange={handleChange} />
              </div>
              <div className="input-box">
                  <span className="details">Username</span>
                  <input name="username" type="text" placeholder="Enter your username" required onChange={handleChange} />
              </div>
              <div className="input-box">
                  <span className="details">Email</span>
                  <input name="email" type="text" placeholder="Enter your email" required  onChange={handleChange} />
              </div>
              <div className="input-box">
                  <span className="details">Location</span>
                  <input name="locationId" type="text" placeholder="Enter your location"  onChange={handleChange}/>
              </div>
              <div className="input-box">
                  <span className="details">Password</span>
                  <input name="password" type="password" placeholder="Enter your password" required onChange={handleChange}/>
              </div>
              <div className="input-box">
                  <span className="details">Confirm Password</span>
                  <input name="confirm_password" type="password" placeholder="Confirm your password" required  onChange={handleChange}/>
              </div>
          </div>
            {errorMessage && <div id="error-message">{errorMessage }</div>}
      
       <div className="section-two">
          <div className="Register"  >
            <button type='submit'>Register</button>
            </div>
      </div>
      </form>
  </div>
    );
};
export default Register;
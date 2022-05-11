import './App.css';
import './style.css';
import Main from './components/main';
import Login from './components/login';
import Register from './components/registration';
import Ads from './components/ads';
import EditUser  from './components/edit_user';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
    <Router>
			<Routes>
        <Route exact path ='/' element={<Main />} />
        <Route exact path ='/login' element={<Login />} />
        <Route exact path ='/register' element={<Register />} />
        <Route exact path ='/advertisments' element={<Ads />} />
        <Route exact path ='/edit_user' element={<EditUser />} />
			</Routes>
		</Router>

    </>
  );
}

export default App;

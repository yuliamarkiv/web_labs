import './App.css';
import './style.css';
import Main from './components/main';
import Login from './components/login';
import Register from './components/registration';
import Ads from './components/public_ads';
import EditUser  from './components/edit_user';
import CreateAdvertisment  from './components/create_advertisment';
import UserAdvertisments  from './components/user_ads';
import UpdateAdvertisment from './components/update_advertisment';
import Alladvertisments from './components/all_advertisments';
import Locations from './components/locations';
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
        <Route exact path ='/create_advertisment' element={<CreateAdvertisment />} />
        <Route exact path ='/edit_user' element={<EditUser />} />
        <Route exact path ='/user_ads' element={<UserAdvertisments />} />
        <Route exact path ='/update_advertisment' element={<UpdateAdvertisment />} />
        <Route exact path ='/all_advertisments' element={<Alladvertisments />} />
        <Route exact path ='/locations' element={<Locations/>} />
        
			</Routes>
		</Router>

    </>
  );
}

export default App;

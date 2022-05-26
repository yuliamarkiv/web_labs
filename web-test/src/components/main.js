import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../files/ADSERVICE.svg';


const Main = () => {
    const navigate = useNavigate();
    const register = () => {
        navigate("/register");
    }
    const login = () => {
        navigate("/login");
    }
    const ads = () => {
        navigate("/advertisments")
    }
    const locations = () => {
        navigate("/locations")
    }

   
    return (
        <>
    <section className ="home">
        <header>
            <nav>
            <img className="logo" src={logo} alt="logo"/>
            <div className = "links">
                <button className= "search_ads" id = "SearchAds" onClick={ads} >Search advertisements</button>
                <button className="button_med" id="SignButton" onClick={register}  >Sign Up</button>
                <button className="button_med" id="loginButton" onClick={login} >Login</button>
                <button className="button_med" id="locations" onClick={locations} > See Locations </button>
            </div>
            </nav>
        </header>
           
    <section className ="info">
        <h1 className = "hero_font">An online advertising platform</h1>
     </section>
    </section>
    </>
    )
    }

export default Main;
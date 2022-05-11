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
        navigate("advertisments")
    }

   
    return (
        <>
    <section class ="home">
        <header>
            <nav>
            <img class="logo" src={logo} alt="logo"/>
            <div class = "links">
                <button class ="search_ads" id = "SearchAds" onClick={ads} >Search advertisements</button>
                <button class="button_med" id="SignButton" onClick={register}  >Sign Up</button>
                <button class="button_med" id="loginButton" onClick={login} >Login</button>
            </div>
            </nav>
        </header>
           
    <section class ="info">
        <h1 class = "hero_font">An online advertising platform</h1>
     </section>
    </section>
    </>
    )
    }

export default Main;
import React , {useState,useEffect} from 'react';
import { decode as base64_decode } from 'js-base64';
import Header from './header';
import { useNavigate } from 'react-router-dom';

const UserAdvertisments = () => {
    const [errorMessage,setErrorMessage] = useState('');
    const getUser = 'http://127.0.0.1:5000/api/v1/user/';
    const getUserAd = 'http://127.0.0.1:5000/api/v1/ads/user/';
    const AdUrl = "http://127.0.0.1:5000/api/v1/ad/"
    const [userId, setUserId] = useState('');
    const [adsData, setAdsData] = useState('');
    const [isLoaded, setIsLoaded] = useState('');
    const navigator = useNavigate();
  
    useEffect(() => {
            const headers = new Headers();
            headers.set('Authorization', `Basic ${localStorage.getItem('logged_in_user')}`);
            headers.set('content-type', 'application/json');
            if (!localStorage.getItem('logged_in_user')) {
                navigator('/login')
            }
            let username = base64_decode(localStorage.getItem('logged_in_user'))
                .split(':')[0];
            
            fetch(getUser + username, {
                method: 'GET',
                headers,
            })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((data) => {
                setUserId(data.id);
                setIsLoaded(true)
            })
    }, [navigator]);
    console.log(userId)

    useEffect(() => {
            if (isLoaded === true){
            const headers = new Headers();
            const url = getUserAd + userId
            headers.set('Authorization', `Basic ${localStorage.getItem('logged_in_user')}`);
            headers.set('content-type', 'application/json');

                fetch(url, {
                    method: 'GET',
                    headers,
                })
                    .then((response) => {
                        if (response.status === 200) {
                            return response.json();
                        }
                    })
                    .then((data) => {
                        setAdsData(data);
                    })
                    .catch(error => {
                        console.log(error);
                        let errorMessage = error.message;
                        setErrorMessage(errorMessage);
                    });
                
                    
                }        
}, [userId,isLoaded]);

const renderData = () => {
        return adsData.map((ad) => {
            const {
                id,
                name,
                text,
                price,
                currency,
                date,
                locationId,
            } = ad;
                return (
                    <div className='ads-container'>
                        <div key = {ad}> 
                        <p> Number of advertisment: advertisment = {id}</p>
                        <p> Title: {name}</p>
                        <p>  {text}</p>
                        <p> Price: {price} {currency}</p>
                        <p> Published date: {date} </p>
                        <p> Location Id: {locationId}</p>
                        <div className="space"> </div>
                    </div>
                    <button id = "deleteButton" onClick={(event) => deleteButtonHandler(event,ad)}> Delete advertisment </button>
                    </div>
                );
            
})
}
const deleteButtonHandler = (event,ad) => {
    event.preventDefault();
    const headers = new Headers();
    const  newadsData = [...adsData];
    const id = adsData.findIndex((findad) => findad.id  === ad.id)
    newadsData.splice(id,1)
    setAdsData(adsData)
    headers.set('Authorization', `Basic ${localStorage.getItem('logged_in_user')}`);
    headers.set('content-type', 'application/json');
    fetch(AdUrl + ad.id, {
        method: 'DELETE',
        headers,
    })
        .catch((error) => {
            let errorMessage = error.message;
            setErrorMessage(errorMessage);
        });
};



    if (!localStorage.getItem('logged_in_user')) {
        navigator('/login')
    }

    return (adsData && <div>
         <Header/>
         <div className='adscontainer'>
            <div className='title'>  <h3> Advertisment</h3> <div className="space"> </div> </div>
             {renderData(adsData)}
             {errorMessage && <div id="error-message">{errorMessage }</div>}
            
        </div>
        
        </div>
    );
    
}
export default UserAdvertisments;
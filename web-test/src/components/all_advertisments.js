import React , {useState,useEffect} from 'react';
import { decode as base64_decode } from 'js-base64';
import Header from './header';
import { useNavigate } from 'react-router-dom';

const Alladvertisments = () => {
    const [errorMessage,setErrorMessage] = useState('');
    const getUser = 'http://127.0.0.1:5000/api/v1/user/';
    const getForUserAd = 'http://127.0.0.1:5000/api/v1/service/user/';
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
            const url = getForUserAd + userId
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
    // console.log(adsData)

const renderData = () => {
        return adsData.map((ad) => {
            const {
                name,
                text,
                price,
                currency,
                date,
                locationId,
                userId
            } = ad;
                return (
                    <div className='ads-container'>
                        <div> 
                        <p> Title: {name}</p>
                        <p>{text}</p>
                        <p> Price: {price} {currency}</p>
                        <p> Published date: {date}</p>
                        <p> Location: {locationId}</p>
                        <p> User: {userId}</p>
                        <div className="space"> </div>
                    </div>
                    </div>
                );
            
})
}



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
export default Alladvertisments;
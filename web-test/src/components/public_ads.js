import React , {useState, useEffect} from 'react';
function Ads (){
    const [adsData, setAdsData] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
    const getPublicAdsUrl = 'http://127.0.0.1:5000/api/v1/service/ads'
    
    useEffect(() => {
        const headers = new Headers();
            fetch(getPublicAdsUrl, {
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
, []);


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
                        <div> 
                        <p> Number of advertisment: advertisment = {id}</p>
                        <p> Title: {name}</p>
                        <p>{text}</p>
                        <p> Price: {price} {currency}</p>
                        <p> Published date: {date}</p>
                        <p> Location Id: {locationId}</p>
                        <div class="space"> </div>
                    </div>
    
                    </div>
                );
            
})
}


    return (adsData && <div>
        <div className='adscontainer'>
           <div className='title'>  <h3> Advertisment</h3> <div class="space"> </div> </div>
            {renderData(adsData)}
            {errorMessage && <div id="error-message">{errorMessage }</div>}
           
       </div>
       
       </div>
   );
}
export default Ads;
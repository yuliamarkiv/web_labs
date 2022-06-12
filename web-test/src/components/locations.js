import React , {useState, useEffect} from 'react';
import Header  from './header';
function Locations (){
    const [locationData, setLocationData] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
    const getLocations = 'http://127.0.0.1:5000/api/v1/service/locations'
    
    useEffect(() => {
        const headers = new Headers();
            fetch(getLocations, {
                method: 'GET',
                headers,
            })
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    }
                })
                .then((data) => {
                   setLocationData(data);
                })
                .catch(error => {
                    console.log(error);
                    let errorMessage = error.message;
                    setErrorMessage(errorMessage);
                });
            
                
            }        
, []);


    const renderData = () => {
        return locationData.map((location) => {
            const {
                name
            } = location;
                return (
                    <div className='ads-container'>
                        <div key="container"> 
                        <p key = "name"> Name : {name}</p>
                        <div className="space" key = "space"> </div>
                    </div>
    
                    </div>
                );
            
})
}
if (localStorage.getItem('logged_in_user')){
    return (locationData && <div>
         <Header> </Header>
        <div className='adscontainer'>
           <div className='title'>  <h3> Locations </h3> <div className="space"> </div> </div>
            {renderData(locationData)}
            {errorMessage && <div id="error-message">{errorMessage }</div>}
           
       </div>
       
       </div>
   );
  }

    return (locationData && <div>
        <div className='adscontainer'>
           <div className='title'>  <h3> Locations </h3> <div className="space"> </div> </div>
            {renderData(locationData)}
            {errorMessage && <div id="error-message">{errorMessage }</div>}
           
       </div>
       
       </div>
   );
}
export default Locations;
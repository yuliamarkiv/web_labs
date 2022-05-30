import React , {useState} from 'react';
import { useNavigate } from 'react-router-dom';


const UpdateAdvertisment = () => {
const backendurl = "http://127.0.0.1:5000/api/v1/ad/";
const [errorMessage,setErrorMessage] = useState('');
const navigator = useNavigate();
let date = new Date()
const [adsData, setadsData] = useState({
    id: '',
    name: '',
    text: '',
    price: '',
    currency: '',
    date: '',
    locationId: '',
    userId: ''
});
  

const handleChange = e => {
    console.log(e.target.value)
    setadsData({
        ...adsData,
        [e.target.name]: e.target.value
    });
};

const handleSelectorChange = e => {
        setErrorMessage(null);
        // console.log(e.target.options[e.target.options.selectedIndex].text)
        setadsData({
            ...adsData,
            currency: e.target.options[e.target.options.selectedIndex].text
        });
        
};
const handleTextChange = e => {
    setErrorMessage(null);
    // console.log(e.target.value)
    setadsData({
        ...adsData,
        text: e.target.value
    });
};


const saveHandler = event => {
    event.preventDefault();
    const headers = new Headers();
    headers.set('content-type', 'application/json');
    headers.set('Authorization', `Basic ${localStorage.getItem('logged_in_user')}`);
    fetch(backendurl + adsData.id, {
        method: 'PUT',
        body: JSON.stringify(
            {
            name: adsData.name,
            text: adsData.text,
            price: adsData.price,
            currency: adsData.currency,
            date: date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate(),
            locationId: adsData.locationId
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
            navigator("/user_ads");
        })
        .catch((error) => {
            console.log(adsData)
            console.log(error)
            let errorMessage = JSON.parse(error.message).message;
            setErrorMessage(errorMessage);
        });

};
console.log(adsData)
if (!localStorage.getItem('logged_in_user')) {
    navigator('/login')
}
return (
   
	<div className="container-ads">
        <div className="title">
            <h2>  Advertisment</h2>
        </div>
        <form className="form" onSubmit={saveHandler}>
            <div className="ads-details">
				<div className = "section-one">
                <div className="input-box">
                    <span className="detailsId">Id</span>
                    <input className="id" name ="id" type="text" onChange={handleChange} required/>
                </div>
                <div className="input-box">
                    <span className="details">Title</span>
                    <input name ="name" type="text" onChange={handleChange} required/>
                </div>
                <div className="input-box">
                    <span className="details">Price</span>
                    <input name ="price" type="text" onChange={handleChange} required/>
                </div>
                <div className="selector">
                <span className="details">Currency</span>
                    <select className="currency" name="currency" id="currency" onChange={handleSelectorChange} >
                        <option value="usd">USD</option>
                        <option value="uah">UAH</option>
                        <option value="eur">EUR</option>
                    </select>
                </div>
                <div className="input-box">
                    <span className="details2">Location</span>
                    <input name="locationId" type="text" onChange={handleChange}/>
                </div>    
				</div>
			<div className = "section-two">
				<div className="input-text">
				<span className="details"> Text </span>
                 <textarea className="info" type="text" onChange={handleTextChange} required/>
                </div>
			</div>
            {errorMessage && <div id="error-message">{errorMessage }</div>}
				<div className="section-three">
				<div className="Save"  >
					<button className="submitButton" onClick={saveHandler}>Save</button>
					</div>
			    </div>
                
            </div>
        </form>
		</div>
)
}
export default UpdateAdvertisment;
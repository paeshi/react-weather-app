import {useEffect, useState} from 'react';
import './App.css';
import Map from './components/Map/Map';
import {getCurrentLatLng} from './services/geolocation';

function App () {

  const [appData, setAppData] = useState({
    lat: null,
    lng: null,
    temp: null,
    icon: ''
  })
  
  async function getAppData() {
    // we need browser location
    const {lat,lng} = await getCurrentLatLng();
    console.log('getting data')

    //get weather data
    const BASE_URL='https://api.openweathermap.org/data/2.5/weather';
    // ?lat=34.0475869&lon=-117.8985651&units=imperial&appid=
    const API_KEY='5b3c5a41e420b342a7d2e498f5e3fd82';

    const weatherData= await fetch(`${BASE_URL}?lat=${lat}&lon=${lng}&units=imperial&appid=${API_KEY}`).then(response => response.json());console.log(weatherData)




    setAppData({
      lat, 
      lng,
      temp: Math.round(weatherData.main.temp),
      icon: weatherData.weather[0].icon,
    });

    };
    // we need weather data
    // set component state to the recieved values
  

  useEffect(() => {

    // make Ajax request here or anything else you need on page load
    getAppData();
  }, []); 
  // The empty array is called a dependency array that stops the infinite loop


  return (
    <div className='App'>
    
      <Map lat={appData.lat} lng={appData.lng}/>
      <header className='App-header'>
      {
        appData.temp && <div>{appData.temp}&deg;</div>
      }
      <h3 style={{padding: 15}}>REACT WEATHER</h3>
      {appData.icon &&
      <img 
      src={`https://openweathermap.org/img/w/${appData.icon}.png`}
      alt='Current Conditions'
      />
      }
      
      {/* <button onClick={() => setAppData({
        lat: 32.82,
        lng: -97,
      })}>Set Location Data</button> */}
      </header>
    </div>
  );
}

export default App;

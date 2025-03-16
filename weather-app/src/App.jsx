import { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const cityInputRef = useRef(null);

  const apiKey = "f84f96b414b47ba4987c5e537265dea7";
  
  
   async function send(event){
    event.preventDefault();
    const city = cityInputRef.current.value;
    console.log(city);
    
    if (!city) {
      setError("Please enter a city");
      setWeatherData(null);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      console.log(err);
      
      setError("City not found. Please try again.");
      setWeatherData(null);
    }
  };

  function weatherEmoji(weatherId){
    if (weatherId >= 200 && weatherId < 300) return "⛈";
    if (weatherId >= 300 && weatherId < 500) return "🌧";
    if (weatherId >= 500 && weatherId < 600) return "🌦";
    if (weatherId >= 600 && weatherId < 700) return "❄";
    if (weatherId >= 700 && weatherId < 800) return "🌫";
    if (weatherId === 800) return "☀";
    if (weatherId > 800) return "☁";
    return "";
  }
  

  console.log(weatherData);
  
  
  return (
    <div className='container'>
    <h1>Weather</h1>
      <div className='weatherForm'>
        <input type='text' className='cityInput' ref={cityInputRef} placeholder='Enter city' />
        <button onClick={send}>Get Weather</button>
      </div>
      
        {error && <p className='errorDisplay'>{error}</p>}
        {weatherData && (
          <div className='card' style={{ display: weatherData || error ? 'block' : 'none' }}>
            <h2 className='cityDisplay'>{weatherData.name}, {weatherData.sys.country}</h2>
            <p className='tempDisplay'>{weatherData.main.temp}°C</p>
            <p className='humidityDisplay'>Humidity: {weatherData.main.humidity}%</p>
            <p className='descriptionDisplay'>{weatherData.weather[0].description}</p>
            <p className='weatherEmoji'>{weatherEmoji(weatherData.weather[0].id)}</p>
          </div>
        )}
    </div>
  );
}

export default App;

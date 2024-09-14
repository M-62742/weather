import React, { useState } from 'react';
import './container.css';

const API_KEY = "07d127d446d731ff7b474ba1633565d0"; // Replace with your OpenWeatherMap API key

const Container = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!city) {
      setError('Please enter a city.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather({
        location: `${data.name}, ${data.sys.country}`,
        temperature: `${data.main.temp}°C`,
        condition: data.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
      });
    } catch (error) {
      setError(error.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`weather-container ${loading ? 'loading' : ''}`}>
      <header className="header">
        <h1>Weather App</h1>
      </header>
      <div className="weather-content">
        <form onSubmit={handleSubmit} className="weather-form">
          <input
            type="text"
            value={city}
            onChange={handleChange}
            placeholder="Enter city"
            className="city-input"
          /> 
          <button type="submit" className="submit-button">Get Weather</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {weather && (
          <div className="weather-current">
            <img src={weather.icon} alt="Weather Icon" />
            <div className="weather-details">
              <h2 className="location">{weather.location}</h2>
              <p className="temperature">{weather.temperature}</p>
              <p className="condition">{weather.condition}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Container;

import React, { useState } from "react";
import axios from "axios";
import './App.css';
export default function SearchEngine() {
  let [city, setCity] = useState("");
  let [loaded, setLoaded] = useState(false);
  let [weather, setWeather] = useState({});

  function getWeather(response) {
    setLoaded(true);
    console.log(response);
    setWeather({
      name: response.data.name,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e8a7198dcdc5f4458611e02123c52297`;
    axios.get(url).then(getWeather);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div className="Search">
      <form onSubmit={handleSubmit}>
        <input type="search" placeholder="Enter a city" onChange={updateCity} />
        <input type="submit" value="search" />
      </form>
    </div>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>{weather.name}</li>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Wind: {weather.wind} km/h</li>
          <li>Humidity: {weather.humidity}%</li>

          <li>Description: {weather.description}</li>
          <li>
            {" "}
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}

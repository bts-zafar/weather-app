import React from 'react'
import { useState } from "react";
const api = {
  key: "0d4362ae2e2fcaf3e8af9e9908baec67",
  base: "http://api.openweathermap.org/data/2.5/"
} 
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt =>{
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  const dateBuilder = (d) =>{
    let months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={typeof weather.main != "undefined" ? ( ( weather.main.temp  > 16 ) ? 'app-warm' : 'app'): 'app' }>
      <main>
        <div className="search_box">
          <input type="text" 
          className="search-bar"
          placeholder="search.." 
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search} />
        </div>
          {(typeof weather.main != "undefined") ? (
          <div>
          <div className="location-boxx">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
          <div className="temp">{Math.round(weather.main.temp)}°C</div>
          <div className="weather">{weather.weather[0].description}</div>
         <div className="icon"><img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}  alt="weather"/></div>
        </div>
        </div>
        ) : ('')}
         <div className="footer">This APP Created by <a href={`https://www.instagram.com/z__a_z__/`} target="_blank"> Zafar Abbas</a> with 💜.</div>
      </main>
    </div>
  );
}

export default App;
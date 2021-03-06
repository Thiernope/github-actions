import React, { useState } from "react";
import './App.css'
import ClipLoader from "react-spinners/ClipLoader";
function App() {
const { REACT_APP_API_KEY } = process.env;
const { REACT_APP_URL_BASE } = process.env;
  const [weatherData, setWeatherData] = useState([{}]);
  const [loading, setLoading ] = useState("");
  const [city, setCity ] = useState("Select City");



  const getWeather = (e) => {
    e.preventDefault();
    setLoading(<ClipLoader/>);
      fetch(`${REACT_APP_URL_BASE}/forecast?q=${city}&appid=${REACT_APP_API_KEY}`).then(
        response => response.json()
      ).then(
       data => {
         setLoading("");
         setWeatherData(data);
         setCity("");
       }
      )
    
  }

  return (
    
    <div className="App">
      
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Deployed app.
        </a>
    <button>It's perfectly working!!</button>
      </header>
 
    <div className="Cont">
      <form className="form" onSubmit={getWeather} >
      <select className="select" value = {city} onChange = {(e)=>{
          const selectedCity = e.target.value;
          setCity(selectedCity);
        }
        } onKeyPress={getWeather}>
          <option value="select">Select City</option>
          <option value="london">London</option>
          <option value="new york">New York</option>
          <option value="kigali">Kigali</option>
          <option value="santiago">Santiago</option>
          <option value="sanpedro">San Pedro</option>
          <option value="filadelfia">Filadelfia</option>

    </select>

    <input className="btn" type="submit" value="Enter"/>
      </form>

    <div className="left">
    {
       typeof weatherData.city === "undefined" ? (<div><h1 className="title">Welcome, Enter the city and see the weather</h1>{loading}</div>):
      (<div>
        {loading}
        <p className="name">{weatherData.city.name}</p>
        <p>Population: <span>{weatherData.city.population}</span></p>
        <div className="div_banner">
        <div className="temp">
        <p>Max Temp: <span>{weatherData.list[0].main.temp_max}*F</span></p>
        <p>Min Temp: <span>{weatherData.list[0].main.temp_min}*F</span></p>
        </div>
        <div className="lat_lon_time">
        <p>Time: <span>{weatherData.list[0].dt_txt}</span></p>
        <p>lat: <span>{weatherData.city.coord.lat}</span></p>
        <p>Long: <span>{weatherData.city.coord.lon}</span></p>
        </div>
        </div>

      </div>)
    } 
     </div>
    </div>

    </div>
  );

}

export default App;

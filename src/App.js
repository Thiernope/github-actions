import React, { useState } from "react";
import Arrow from "./components/Arrow"
import image from "./components/images/background.PNG"
import './App.css'
import ClipLoader from "react-spinners/ClipLoader";
function App() {

  const apiKey = "37b1ccbfe7e570fe03561d545c9d3bca";
  const [weatherData, setWeatherData] = useState([{}]);
  const [loading, setLoading ] = useState("");
  const [city, setCity ] = useState("Select City");



  const getWeather = (e) => {
    e.preventDefault();
    console.log(city);
    setLoading(<ClipLoader/>);
      fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`).then(
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
          Deployed app
        </a>
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
          <option value="arserri">Aserrí</option>
          <option value="sanpedro">San Pedro</option>
          <option value="filadelfia">Filadelfia</option>

    </select>

    <input className="btn" type="submit" value="--->"/>
      </form>

    <div className="left">
    {
      typeof weatherData.city === "undefined" ? (<div><h1 className="title">Welcome, Enter the city and see the weather</h1>{loading}</div>):
      (<div>
        {loading}
        <p className="name">{weatherData.city.name}</p>
        <p>Population: {weatherData.city.population}</p>
        <div className="div_banner">
        <div className="temp">
        <p>Max Temp: {weatherData.list[0].main.temp_max}*F</p>
        <p>Min Temp: {weatherData.list[0].main.temp_min}*F</p>
        </div>
        <div className="lat_lon_time">
        <p>Time: {weatherData.list[0].dt_txt}</p>
        <p>lat: {weatherData.city.coord.lat}</p>
        <p>Long: {weatherData.city.coord.lon}</p>
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

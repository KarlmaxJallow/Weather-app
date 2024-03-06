import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import InputSearch from "@/components/input_search";
import ForeCastCard from "@/components/forecast_card";
import { useEffect, useState } from "react";
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [searchInput, setSearchInput] = useState("Banjul");
  const [currentCity, setCurrentCity] = useState("Banjul")
  const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [error, setError] = useState(null);


  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const fetchForecast = async () => {
    try{
    const NEXT_WEATHER_KEY = "b931bf6686418af2c4575a139c2b5142";
    const  city = searchInput || 'banjul';
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=b931bf6686418af2c4575a139c2b5142`);
    const list=response.data.list
    const first5 = [];

  const foundDates = [new Date().toLocaleString("lt").split(" ")[0]];

  for (let i = 0; i < list.length; i++) {
    const obj = list[i];
    const date_txt = obj.dt_txt.split(" ")[0];
    if (!foundDates.includes(date_txt)) {
      foundDates.push(date_txt);
      first5.push(obj);
    }

  }

  console.log(first5);

    setForecastData(first5);

    } catch (error) {
    console.error("Error fetching forecast data");
    }
  };

  const handleSearch = async () => {

    const NEXT_WEATHER_KEY= "b931bf6686418af2c4575a139c2b5142";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${NEXT_WEATHER_KEY}`;
    const response = await axios.get(apiUrl);


    setWeatherData(response.data);
    fetchForecast();
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey ="b931bf6686418af2c4575a139c2b5142";
        const city ='Banjul';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await axios.get(apiUrl);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };



    fetchWeatherData();
    fetchForecast();
  }, []);

console.log('forecast: '+forecastData);

  return (
    <div className="main_container">
      <section className="search_container">
        <input
          type="text"
          placeholder="Enter to search"
          value={searchInput}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </section>
      <section className="current_day_viewer">
        <div className="icon_view">
          <div className="day_icon">
            <Image
              src="https://openweathermap.org/img/wn/01d@2x.png"
              width={200}
              height={200}
              alt="sunny image"
            />
          </div>
        </div>
        <div className="location_info_container">
          <div className="location_name_header">
            <h4>{weatherData?.name}</h4>
          </div>
          <div className="current_location_info">
            <p>Temperature: {weatherData?.main.temp}</p>

            <p>Pressure: {weatherData?.main.pressure} hPa</p>
            <p>Clouds:{weatherData?.clouds.all}%</p>
            <p>Wind Direction:{weatherData?.wind.deg} degrees</p>
            <p>Wind Speed:{weatherData?.wind.speed} km/h</p>
            <p>Humidity: {weatherData?.main.humidity} %</p>
          </div>
        </div>
      </section>
      <section className="next_forecast_container">


    {Array.isArray(forecastData) && forecastData.map((item,idx) => (
      <div key={idx}>
        <ForeCastCard data={item} />
      </div>
    ))}



      </section>
    </div>
  );
}

import React from "react";
import { useState, useEffect } from "react";
import "./Citydata.css";

const Citydata = ({ cidade }) => {
  const [location, setLocation] = useState(null);
  const [locationKey, setLocationKey] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_CHAVE_DA_API;
  const weatherIcons = {
    sunny: "fa-solid fa-sun",
    cloud_sun:"fa-solid fa-cloud-sun",
    cloudy: "fa-solid fa-cloud",
    rainy: "fa-solid fa-cloud-showers-heavy",
    snowy: "fa-solid fa-snowflake",
  };



  const getWeatherIcon = (weatherText) => {
    const lowerCaseText = weatherText.toLowerCase();
  
    if (lowerCaseText.includes("sunny")) {
      return weatherIcons.sunny;
    } else if (lowerCaseText.includes("cloudy")) {
      return weatherIcons.cloudy;
    } else if (lowerCaseText.includes("rain")) {
      return weatherIcons.rainy;
    } else if (lowerCaseText.includes("snow")) {
      return weatherIcons.snowy;
    } else if (lowerCaseText.includes("clouds and sun")) {
      return weatherIcons.cloud_sun;
    } else {
      return "fa-solid fa-question"; // Ícone padrão para condições desconhecidas
    }
  };


  useEffect(() => {
    async function getData(city) {
      try {
        const locationURL = `/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;
        const locationResponse = await fetch(locationURL);
        if (!locationResponse.ok) {
          throw new Error(
            `Erro ao fazer a requisição da location! status:${locationResponse.status}`
          );
        }

        const locationData = await locationResponse.json();
        if (locationData.length === 0) {
          window.alert("Localização não encontrada")
          throw new Error("Localização não encontrada.");
        }

        const lugar = locationData[0];
        console.log(lugar);
        console.log(locationData);

        if (lugar.Key) {
          setLocation(lugar);
          setLocationKey(lugar.Key);
          setError(null);
          const currentConditionURL = `/currentconditions/v1/${lugar.Key}?apikey=${apiKey}&details=true`;
          const weatherResponse = await fetch(currentConditionURL);
          if (!weatherResponse.ok) {
            throw new Error(
              `Erro ao fazer a requisição dos dados do weather! status:${weatherResponse.status}`
            );
          }
          const weather = await weatherResponse.json();
          console.log(weather[0]);
          setWeatherData({ ...weather[0], name: lugar.LocalizedName });
        } else {
          setError("Localização Inválida");
        }
        console.log(locationKey);
      } catch (err) {
        console.error("Erro:", err);
        setError(err.message);
        setLocation(null);
        setWeatherData(null);
      }
    }
    if (cidade) {
      getData(cidade);
    }
  }, [cidade, apiKey]);

  if (!location || !weatherData) {
    return <p>Carregando dados...</p>;
  }

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {location && (
        <div className="card">
          <div className="tituloCidade">
            <h2>
              <i
                className="fa-solid fa-location-dot"
                style={{ marginRight: "8px" }}
              />
              <span>{weatherData.name}</span>
            </h2>
          </div>
          <h1>{weatherData.Temperature.Metric.Value}°C</h1>
          <p className="title">
            <i className={getWeatherIcon(weatherData.WeatherText)} />
            {weatherData.WeatherText}
          </p>
          <div className="weather-info">
            <p>
              <i className="fa-solid fa-wind" />{weatherData.Wind.Speed.Metric.Value} km/h
            </p>
            <p>
              <i className="fa-solid fa-droplet" /> {weatherData.RelativeHumidity}%
            </p>
          </div>
          <p>
            <button>Contact the developer</button>
          </p>
        </div>
      )}
    </>
  );
};

export default Citydata;

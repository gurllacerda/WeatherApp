import React from "react";
import { useState, useEffect } from "react";
import "./Citydata.css";

const Citydata = ({ cidade }) => {
  const [location, setLocation] = useState(null);
  const [locationKey, setLocationKey] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_CHAVE_DA_API;

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
        const lugar = locationData[0];
        console.log(lugar);
        console.log(locationData);
        setLocation(lugar);
        setLocationKey(lugar.Key);

        const currentConditionURL = `currentconditions/v1/${lugar.Key}?apikey=${apiKey}&details=true`;
        const weatherResponse = await fetch(currentConditionURL);
        if (!weatherResponse.ok) {
          throw new Error(
            `Erro ao fazer a requisição dos dados do weather! status:${weatherResponse.status}`
          );
        }

        const weather = await weatherResponse.json();
        setWeatherData(weather[0]);
      } catch (err) {
        console.error("Erro:", err);
        setError("Não foi possível buscar os dados.");
        setLocation(null);
        setWeatherData(null);
      }
    }
    if (cidade) {
      getData(cidade);
    }
  }, [cidade, apiKey]);

  useEffect(() => {
    //console para consultar nome dos parâmetros
    console.log(weatherData);
  }, [weatherData]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!location || !weatherData) {
    return <p>Carregando dados...</p>;
  }

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {location && (
        <div>
          <div className="tituloCidade">
          <h2 style={{ textAlign: "center" }}>
            <i className="fa-solid fa-location-dot" style={{marginRight: "8px"}}/>
            <span>{location.LocalizedName}</span>
          </h2>
          </div>
          
          <div className="card">
            <h1>{weatherData.Temperature.Metric.Value}°C</h1>
            <p className="title">{weatherData.WeatherText}</p>
            {/* <p className="title">{weatherData.Wind.Speed.Metric.Value}km/h</p> */}
            <p>{weatherData.Wind.Speed.Metric.Value}km/h</p>
            <p>
              <button>Contact</button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Citydata;

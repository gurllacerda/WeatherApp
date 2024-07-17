import React from "react";
import { useState, useEffect } from "react";
import "./Citydata.css";

const Citydata = ({ cidade }) => {
  const [location, setLocation] = useState(null);
  const [locationKey, setLocationKey] = useState('');
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_CHAVE_DA_API;
  
  useEffect(() => {
    const getLocation = (location) => {
      // const url = `/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;

      // http://dataservice.accuweather.com/locations/v1/regions
      // "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=RMOFiWgBOMvRcjK6GEdkryGc3VCIA1ga&q=karachi"
      const url = `/locations/v1/cities/search?apikey=${apiKey}&q=${location}`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // console.log(data.map(d => {return {key: d.LocalizedName, ...d}}))
          //pega o array de objetos na linha 0, e depois seta 
          const lugar = data[0]
          console.log(lugar.Key)
          setLocationKey(lugar.Key)
          setLocation(lugar);
          setError(null);
        })
        .catch((err) => {
          console.error("Erro ao buscar localização:", err);
          setError("Não foi possível encontrar essa localização.");
          setLocation(null);
        });
    };

    if (cidade) {
      getLocation(cidade);
      console.log(location);
    }
  }, [cidade, apiKey]);

  return (
    <div>
        {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
        {location && (
            <div style={{ backgroundColor: "blue" }}>
                <h2 style={{ textAlign: "center" }}>User Profile Card</h2>
                <div className="card">
                    {/* Substitua com dados reais da localização se necessário */}
                    <h1>{location.LocalizedName}</h1>
                    <p className="title">CEO & Founder, Example</p>
                    <p>Harvard University</p>
                    <p>
                        <button>Contact</button>
                    </p>
                </div>
            </div>
        )}
    </div>
);
};

export default Citydata;

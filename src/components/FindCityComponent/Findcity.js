import React, { useState } from "react";
import Citydata from "../CityDataComponent/Citydata";
import "./Findcity.css";

const FindCity = () => {
  const [cidade, setCidade] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    const searchInput = event.target.elements.search2.value;
    setCidade(searchInput);
  };

  return (
    <div className="container">
      <div className="findCity">
        <form className="example" onSubmit={handleSearch} style={{ maxWidth: "300px" }}>
          <input type="text"placeholder="Digite o nome da cidade" name="search2"/>
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      <div className="cityData">
        <Citydata cidade={cidade} />
      </div>
    </div>
  );
};

export default FindCity;

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
      <div>
        <form
          className="example"
          onSubmit={handleSearch}
          style={{ margin: "3px", maxWidth: "300px" }}
        >
          <input type="text" placeholder="Search..." name="search2" />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      <div>
        <Citydata cidade={cidade} />
      </div>
    </div>
  );
};

export default FindCity;

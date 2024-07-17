import React, { useState } from 'react';
import Citydata from '../CityDataComponent/Citydata';
import './Findcity.css';

const FindCity = () => {
    const [cidade, setCidade] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        const searchInput = event.target.elements.search2.value;
        setCidade(searchInput);
    };

    return (
        <div className="container">
            <form className="example" onSubmit={handleSearch} style={{ margin: 'auto', maxWidth: '300px' }}>
                <input type="text" placeholder="Search..." name="search2" />
                <button type="submit">
                    <i className="fa fa-search"></i>
                </button>
            </form>
            <Citydata cidade={cidade} />
        </div>
    );
};

export default FindCity;
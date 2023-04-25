import { useState } from 'react'
import React from "react"
import getStorePageDetails from '../services/storePageComparisons'


const StorePageComparison = (props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const suggestions = ['apple', 'banana', 'orange'].filter((item) =>
      item.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(suggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedGames([...selectedGames, suggestion]);
    setSearchTerm('');
  };
  

  return (
    <div>
      <div> Search for Steam Game:  <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
        />
      <ul>
        {suggestions.map((item, index) => (
          <li key={index} onClick={() => handleSuggestionClick(item)}>
            {item}
          </li>
        ))}
      </ul>

      <ul>
        {selectedGames.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      </div>
    </div>
  )
}
  
export default StorePageComparison
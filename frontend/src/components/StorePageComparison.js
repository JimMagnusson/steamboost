import { useState } from 'react'
import React from "react"
import getStorePageDetails from '../services/steamAPIService'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import steamAPIService from '../services/steamAPIService'

const steamGames = [
    {
      id: 0,
      name: "Valheim",
      appID: 892970
    },
    {
      id: 1,
      name: "Baldurs Gate 3",
      appID: 1086940
    },
    {
      id: 2,
      name: "Dota 2",
      appID: 570
    },
    {
      id: 3,
      name: "Half-Life 2",
      appID: 220
    },
  ];

const StorePageComparison = (props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
    // Ide: 
    
    // Load array of all steam games during initialization.
    // Assume above can be done.

    // Contains names and their appid
    // use this array for the searchbar as the items array.


    // Result of fuzzy search set in results. 

    // Take these appids and do API call on all of them

    // TODO: loop over all results

    // TODO: FIX CORS PROBLEM
    steamAPIService
    .getStorePageDetails(results[0].appID)
    .then(steamGame => {
        console.log(steamGame)
        console.log("Name " + steamGame.name)

        // TODO: get image from steamGame.header_image

        // TODO: display image in formatResults
    })
    // Show icon and name in the search bar by updating some state variables



    //setSuggestions(suggestions);
  }

  const handleOnHover = (result) => {
    // the item hovered
    //console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    //console.log(item)
  }

  const handleOnFocus = () => {
    //console.log('Focused')
  }

  const handleOnClear = () => {
    //console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
      </>
    )
  }
  

  return (
    <div>
      <h2>Steam Store Page Comparison</h2>
        <div style={{ marginBottom: 20 }}>Search for Steam Game:</div>
          <ReactSearchAutocomplete
            items={steamGames}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            onClear={handleOnClear}
            styling={{ zIndex: 1 }}
            formatResult={formatResult}
            autoFocus
          />

        <ul>
        {selectedGames.map((item, index) => (
            <li key={index}>{item}</li>
        ))}
        </ul>
    </div>
  )
}
  
export default StorePageComparison
import { useState } from 'react'
import React, { useEffect } from "react"
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import steamStoreAPIService from '../services/steamStoreAPIService'
import steamSpyAPIService from '../services/steamSpyAPIService'
import GameList from '../components/GameList'
import SharedTags from '../components/SharedTags'

import axios from 'axios'

const StorePageComparison = (props) => {
  const [selectedGames, setSelectedGames] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const SUGGESTIONS_LIMIT = 10;

  const handleOnSearch = (string, results) => {
    // Arguments: the string searched for and the results of the fuzzy search.

    // Currently only have appID + name. 
    // Want to show cover image in search bar and later on also screenshots, videos, etc.
    if(results.length > 0){
      for(let i = 0; i < results.length; i++)
      steamStoreAPIService
        .getStorePageDetails(results[i].appID)
        .then(response => {
            if(response.success) {
              const steamGame = response.data;
              let videos = [];
              if(steamGame.hasOwnProperty("movies")) {
                videos = steamGame.movies.map(item => ({
                  src: item.mp4['480'],
                  thumbnail: item.thumbnail,
                }))
              }

              const suggestionObject = {
                name: steamGame.name,
                headerImage: steamGame.header_image,
                shortDescription: steamGame.short_description,
                screenshots: steamGame.screenshots.map(item => item.path_thumbnail),
                videos: videos,
                id: steamGame.steam_appid
              }

              // Update suggestions state
              setSuggestions(prevState => {
                // Add the new data to the the array
                const newSuggestions = [...prevState, suggestionObject]
                
                if(newSuggestions.length > SUGGESTIONS_LIMIT) {
                  return newSuggestions.slice(1); // Remove old data
                }

                return newSuggestions
              })
            }
        })
    }
  }

  const handleOnSelect = (item) => {
    // Add to selected games list
    const selectedSuggestion = suggestions.find((suggestion) => suggestion.name === item.name)

    let selectedGameObject = {
      id: selectedSuggestion.id,
      image: selectedSuggestion.headerImage,
      title: selectedSuggestion.name,
      screenshots: selectedSuggestion.screenshots,
      videos: selectedSuggestion.videos,
      description: selectedSuggestion.shortDescription,
      tags: []
    }

    // API call to SteamSpy to get user defined tags
    steamSpyAPIService.getTags(selectedSuggestion.id)
    .then(tags => {
        if(tags !== undefined) {
          const keys = Object.keys(tags);
          selectedGameObject.tags = keys;
          setSelectedGames(selectedGames.concat(selectedGameObject))
        }
    })
  }

  const formatResult = (item) => {
    const result = suggestions.find((suggestion) => suggestion.id === item.appID)
    return (
      <div>
        <span> { result !== undefined && // No image until response from store api is done
          <img src={result.headerImage} alt="Trees" height="80" />
          }
          {item.name}</span>
      </div>
    )
  }

  useEffect(() => {
    axios
    .get('http://localhost:3001/get-steam-games')
    .then(response => {
      let games = response.data;
      // Add index field to all elements. Errors pop up otherwise.
      games = games.map((item, index) => ({ ...item, id: index + 1 })) 
      setAllGames(games)
    })
  }, [])
  
  function handleOnRemoveClick(gameTitle) {
    const newSelectedGames = selectedGames.filter((item) => gameTitle !== item.title)
    setSelectedGames(newSelectedGames)
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Steam Store Page Comparison
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '400px' }}>
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            Search for Steam Game:
          </div>
          <ReactSearchAutocomplete
            items={allGames}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            styling={{ zIndex: 1 }}
            formatResult={formatResult}
            autoFocus
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="App" style={{ maxWidth: '800px', marginTop: '20px' }}>
          <GameList games={selectedGames} onRemoveClick={handleOnRemoveClick} />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '800px', marginTop: '20px' }}>
          <SharedTags games={selectedGames} />
        </div>
      </div>
    </div>
  );
}
  
export default StorePageComparison